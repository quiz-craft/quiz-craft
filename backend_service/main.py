"""
Server main runtime
"""

# pylint: disable=unused-import

from backend_service.app import app
from backend_service.routers.user import router as UserRouter


app.include_router(UserRouter)
