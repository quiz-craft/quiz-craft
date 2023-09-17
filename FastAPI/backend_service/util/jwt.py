"""
FastAPI JWT configuration
"""

# pylint: disable=unused-argument

from datetime import datetime, timedelta
from typing import Annotated

from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from backend_service.models.auth import TokenData
from backend_service.models.user import User
from backend_service.config import CONFIG

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


def create_access_token(data: dict, expires_delta: timedelta):
    """ Create JWT access token with payload """
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode, CONFIG.jwt_secret_key, algorithm="HS256")
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    """Returns the current authorized user"""
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, CONFIG.jwt_secret_key, algorithms="HS256")
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError as exc:
        raise credentials_exception from exc

    user = await User.by_username(token_data.username)
    if user is None:
        raise credentials_exception
    return user
