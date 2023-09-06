"""
Registration router
"""

from fastapi import APIRouter, Body, Depends, HTTPException, Response

from backend_service.models.user import User, UserAuth, UserOut
from backend_service.util.password import get_password_hash

router = APIRouter(prefix="/register", tags=["Register"])


@router.post("", response_model=UserOut)
async def user_registration(user_auth: UserAuth):
    """Creates a new user"""
    user = await User.by_username(user_auth.username)

    if user is not None:
        raise HTTPException(409, "User with that email already exists")

    hashed = get_password_hash(user_auth.password)
    user = User(username=user_auth.username, password=hashed)
    await user.create()
    return user
