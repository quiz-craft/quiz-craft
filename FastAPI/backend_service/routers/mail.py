"""
Mail router
"""

from datetime import datetime, timezone
from typing import Annotated

from jose import JWTError, jwt
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from backend_service.util.mail import send_verification_email
from backend_service.util.jwt import create_access_token, get_current_user
from backend_service.models.user import User
from backend_service.config import CONFIG

router = APIRouter(prefix="/mail", tags=["Mail"])


@router.post("/verify")
async def request_verification_email(user: Annotated[User, Depends(get_current_user)]
                                     ):
    """Send the user a verification email"""

    if user.email_confirmed_at is not None:
        raise HTTPException(400, "Email is already verified")

    if user.disabled:
        raise HTTPException(400, "Your account is disabled")

    token = create_access_token(
        data={"sub": user.email})
    url, token = await send_verification_email(user.email, token)

    if url:
        return JSONResponse(jsonable_encoder({"url": url, "token": token}))

    return Response(status_code=200)


@router.post("/verify/{token}")
async def verify_email(token: str, user: Annotated[User, Depends(get_current_user)]):
    """Verify the user's email with the supplied token"""

    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, CONFIG.jwt_secret_key, algorithms="HS256")
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError as exc:
        raise credentials_exception from exc

    user = await User.by_email(email)

    if user is None:
        raise credentials_exception

    if user.email_confirmed_at is not None:
        raise HTTPException(400, "Email is already verified")
    if user.disabled:
        raise HTTPException(400, "Your account is disabled")

    user.email_confirmed_at = datetime.now(tz=timezone.utc)
    await user.save()

    return Response(status_code=200)
