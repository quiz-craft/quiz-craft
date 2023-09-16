"""
Server main runtime
"""

# pylint: disable=unused-import

from backend_service.app import app
from backend_service.routers.auth import router as AuthRouter
from backend_service.routers.mail import router as MailRouter
from backend_service.routers.register import router as RegisterRouter
from backend_service.routers.user import router as UserRouter
from backend_service.routers.quiz import router as QuizRouter


app.include_router(AuthRouter)
app.include_router(MailRouter)
app.include_router(RegisterRouter)
app.include_router(UserRouter)
app.include_router(QuizRouter)
