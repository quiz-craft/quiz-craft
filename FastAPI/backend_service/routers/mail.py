"""
Mail router
"""

from datetime import datetime, timezone, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from backend_service.util.mail import send_verification_email
from backend_service.util import jwt
from backend_service.models.user import User, UserOut

router = APIRouter(prefix="/mail", tags=["Mail"])


@router.post("/verify")
async def request_verification_email(user: Annotated[User, Depends(jwt.get_current_user)]
                                     ):
    """Send the user a verification email"""

    if user.email_confirmed_at is not None:
        raise HTTPException(400, "Email is already verified")

    if user.disabled:
        raise HTTPException(400, "Your account is disabled")

    token = jwt.create_access_token(expires_delta=timedelta(minutes=15),
                                    data={"sub": user.username})
    url, token = await send_verification_email(user.email, token)

    if url:
        return JSONResponse(jsonable_encoder({"url": url, "token": token}))

    return Response(status_code=200)


@router.post("/verify/{token}", response_model=UserOut)
async def verify_email(token: str, user: Annotated[User, Depends(jwt.get_current_user)]):
    """Verify the user's email with the supplied token"""

    user = await jwt.get_current_user(token)

    if user.email_confirmed_at is not None:
        raise HTTPException(400, "Email is already verified")
    if user.disabled:
        raise HTTPException(400, "Your account is disabled")

    user.email_confirmed_at = datetime.now(tz=timezone.utc)
    await user.save()

    return user
