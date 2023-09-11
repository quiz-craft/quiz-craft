"""
User models
"""

# pylint: disable=too-few-public-methods

from datetime import datetime
from typing import Optional

from beanie import Document, Indexed
from pydantic import BaseModel, EmailStr


class UserAuth(BaseModel):
    """User register and login auth"""

    username: str
    password: str


class UserUpdate(BaseModel):
    """Updatable user fields"""

    email: EmailStr | None = None

    # User information
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserOut(UserUpdate):
    """User fields returned to the client"""

    username: Indexed(str, unique=True)
    disabled: bool = False


class User(Document, UserOut):
    """User DB representation"""

    password: str
    email_confirmed_at: Optional[datetime] = None

    def __repr__(self) -> str:
        return f"<User {self.username}>"

    def __str__(self) -> str:
        return self.username

    def __hash__(self) -> int:
        return hash(self.username)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, User):
            return self.email == other.email
        return False

    @property
    def created(self) -> datetime:
        """Datetime user was created from ID"""
        return self.id.generation_time

    @classmethod
    async def by_username(cls, username: str) -> "User":
        """Get a user by username"""
        return await cls.find_one(cls.username == username)

    @classmethod
    async def by_email(cls, email: str) -> "User":
        """Get a user by email"""
        return await cls.find_one(cls.email == email)