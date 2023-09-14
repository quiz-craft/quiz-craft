"""
Registration router
"""

from fastapi import APIRouter, HTTPException

from backend_service.models.user import User, UserRegister, UserOut
from backend_service.util.password import get_password_hash

router = APIRouter(prefix="/register", tags=["Register"])


@router.post("", response_model=UserOut)
async def user_registration(user_register: UserRegister):
    """Creates a new user"""
    user = await User.by_username(user_register.username)

    if user is not None:
        raise HTTPException(409, "User with that username already exists")

    user = await User.by_email(user_register.email)

    if user is not None:
        raise HTTPException(409, "User with that email already exists")

    hashed = get_password_hash(user_register.password)
    user = User(username=user_register.username,
                password=hashed, email=user_register.email)
    await user.create()
    return user
