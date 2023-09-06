from fastapi import FastAPI
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from backend_service.config import CONFIG
from backend_service.models.user import User


app = FastAPI()


@app.on_event("startup")
async def app_init():
    """Initialize application services"""
    app.db = AsyncIOMotorClient(CONFIG.mongo_uri).account
    await init_beanie(app.db, document_models=[User])
