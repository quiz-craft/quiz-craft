"""
Authentication router
"""
from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm

from backend_service.models.auth import Token
from backend_service.models.user import User
from backend_service.util.jwt import create_access_token
from backend_service.util.password import verify_password


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
    """Authenticates and returns the user's JWT"""
    username_or_email = form_data.username if form_data.username else form_data.email
    user = await authenticate_user(username_or_email, form_data.password)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # TODO: change hardcode token expiration value to config option
    access_token = create_access_token(
        data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
