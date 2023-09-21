"""
FastAPI server configuration
"""

# pylint: disable=too-few-public-methods
from datetime import timedelta

from decouple import AutoConfig
from pydantic import BaseModel

config = AutoConfig(search_path='/config/fastapi/')


class Settings(BaseModel):
    """Server config settings"""

    # Server domain and root paths
    root_url: str = config("ROOT_URL")
    domain_path: str = config("DOMAIN_PATH")

    # Mongo Engine settings
    mongo_uri: str = config("MONGO_URI")

    # Security settings
    jwt_secret_key: str = config("JWT_SECRET_KEY")
    jwt_exipiration_time: timedelta = config(
        "JWT_EXPIRATION_MINUTES", default=15,
        cast=lambda m: timedelta(minutes=int(m)))

    # FastMail SMTP server settings
    mail_server: str = config("MAIL_SERVER", default="mail.quiz-craft.com")
    mail_port: int = config("MAIL_PORT", default=587, cast=int)
    mail_username: str = config("MAIL_SERVER_USER")
    mail_password: str = config("MAIL_SERVER_PASSWORD")
    mail_sender: str = config("MAIL_SENDER", default="noreply@quiz-craft.com")

    testing: bool = config("TESTING", default=False, cast=bool)


CONFIG = Settings()
