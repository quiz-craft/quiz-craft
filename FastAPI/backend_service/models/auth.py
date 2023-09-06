"""
Auth response models
"""

# pylint: disable=too-few-public-methods

from pydantic import BaseModel


class Token(BaseModel):
    """Access token details"""
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
