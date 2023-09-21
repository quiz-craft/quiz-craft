"""FastAPI app module"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from backend_service.config import CONFIG
from backend_service.models.user import User
from backend_service.models.quiz import Quiz


app = FastAPI(root_path=CONFIG.root_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def app_init():
    """Initialize application services"""
    db_name = "quiz-craft-test" if CONFIG.testing else "quiz-craft"
    app.db = AsyncIOMotorClient(CONFIG.mongo_uri)[db_name]
    await init_beanie(app.db, document_models=[User, Quiz])
