"""
Authentication router
"""
from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends, Body, Response
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import EmailStr

from backend_service.models.auth import Token
from backend_service.models.user import User, UserOut
from backend_service.util import jwt
from backend_service.util.password import verify_password, get_password_hash
from backend_service.util.mail import send_password_reset_email


router = APIRouter(prefix="/auth", tags=["Auth"])


async def authenticate_user(username_or_email: str, password: str) -> User:
    """ Check if username exists and password matches"""
    user = await User.by_username(username_or_email)
    if not user:
        user = await User.by_email(username_or_email)
        if not user:
            return False
    if not verify_password(password, user.password):
        return False
    return user


@router.post("/token", response_model=Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    """Authenticates user and returns the user's JWT"""
    username_or_email = form_data.username if form_data.username else form_data.email
    user = await authenticate_user(username_or_email, form_data.password)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # TODO: change hardcode token expiration value to config option
    access_token = jwt.create_access_token(
        data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/forgot-password")
async def forgot_password(email: Annotated[EmailStr, Body()]):
    """Sends a password reset email"""

    user = await User.by_email(email)

    if user:
        access_token = jwt.create_access_token(
            data={"sub": user.username})

        url, token = await send_password_reset_email(email, access_token)

        if url:
            return JSONResponse(jsonable_encoder({"url": url, "token": token}))

    return Response(status_code=200)


@router.post("/reset-password/{token}", response_model=UserOut)
async def reset_password(token: str, password: Annotated[str, Body()]):
    """Reset user password from token value"""
    user = await jwt.get_current_user(token)

    user.password = get_password_hash(password)
    await user.save()
    return user
