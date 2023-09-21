"""
Mail server config
"""

from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType

from backend_service.config import CONFIG

mail_conf = ConnectionConfig(
    MAIL_USERNAME=CONFIG.mail_username,
    MAIL_PASSWORD=CONFIG.mail_password,
    MAIL_FROM=CONFIG.mail_sender,
    MAIL_PORT=CONFIG.mail_port,
    MAIL_SERVER=CONFIG.mail_server,
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=False,
    VALIDATE_CERTS=False
)

mail = FastMail(mail_conf)


async def send_verification_email(email: str, token: str):
    """Send user verification email"""
    # Change this later to public endpoint
    url = CONFIG.domain_path + CONFIG.root_url + "/mail/verify/" + token
    if CONFIG.testing:
        print("POST to " + url)
        return url, token

    message = MessageSchema(
        recipients=[email],
        subject="Quiz Craft Email Verification",
        body="Welcome to Quiz Craft! We just need to verify your email to begin: "
        + url, subtype=MessageType.html)
    await mail.send_message(message)


async def send_password_reset_email(email: str, token: str):
    """Sends password reset email"""
    # Change this later to public endpoint
    url = CONFIG.domain_path + CONFIG.root_url + "/auth/reset-password/" + token
    if CONFIG.testing:
        print("POST to " + url)
        return url, token

    message = MessageSchema(
        recipients=[email],
        subject="Quiz Craft Password Reset",
        body=f"""Click the link to reset your Quiz Craft account password: {url}\n
        If you did not request this, please ignore this email.
        """, subtype=MessageType.html)
    await mail.send_message(message)
