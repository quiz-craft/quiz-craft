"""
FastAPI server configuration
"""

# pylint: disable=too-few-public-methods

from decouple import config
from pydantic import BaseModel


class Settings(BaseModel):
    """Server config settings"""

    root_url: str = config("ROOT_URL")

    # Mongo Engine settings
    mongo_uri: str = config("MONGO_URI")

    # Security settings
    jwt_secret_key: str = config("SECRET_KEY")

    # FastMail SMTP server settings
    mail_server: str = config("MAIL_SERVER", default="mail.quiz-craft.com")
    mail_port: int = config("MAIL_PORT", default=587, cast=int)
    mail_username: str = config("MAIL_USERNAME", default="")
    mail_password: str = config("MAIL_PASSWORD", default="")
    mail_sender: str = config("MAIL_SENDER", default="noreply@quiz-craft.com")

    testing: bool = config("TESTING", default=False, cast=bool)


CONFIG = Settings()
