"""
User router
"""
from typing import Annotated

from fastapi import APIRouter, Depends, Response

from backend_service.models.user import User, UserOut, UserUpdate
from backend_service.util.jwt import get_current_user

router = APIRouter(prefix="/user", tags=["User"])


@router.get("", response_model=UserOut)
async def get_user(user: Annotated[User, Depends(get_current_user)]):
    """Returns the current user"""
    await user.fetch_all_links()
    # print(user.quizes_created)
    # print(type(user.quizes_created[0]))
    return user


@router.patch("", response_model=UserOut)
async def update_user(update: UserUpdate, user: Annotated[User, Depends(get_current_user)]):
    """Update allowed user fields"""
    user = user.copy(update=update.dict(exclude_unset=True))
    await user.save()
    return user


@router.delete("")
async def delete_user(user: Annotated[User, Depends(get_current_user)]):
    """Delete current user"""
    await User.find_one(User.username == user.username).delete()
    return Response(status_code=204)
