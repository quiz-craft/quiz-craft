"""
Quiz models
"""

from datetime import datetime
from typing import Optional, List

from beanie import Document, Indexed, PydanticObjectId
from pydantic import BaseModel


class QuizCreate(BaseModel):
    """Quiz create data"""
    title: str
    questions: Optional[List[List[str]]]
    topic: Optional[str]
    instruction: Optional[str]


class QuizUpdate(BaseModel):
    """Updatable quiz data"""
    title: Optional[str]
    questions: Optional[List[List[str]]]
    topic: Optional[str]
    instruction: Optional[str]


class QuizOut(QuizUpdate):
    """Quiz fields returned to the client"""

    title: Indexed(str)
    questions: List[List[str]] = []
    topic: str = "Quiz"
    instruction: str = ""
    owner_id: PydanticObjectId


class Quiz(Document, QuizOut):      # pylint: disable=too-many-ancestors
    """Quiz DB representation"""

    def __repr__(self) -> str:
        return f"<Quiz {self.title} {self.id}>"

    def __str__(self) -> str:
        return str(self.title)

    def __hash__(self) -> int:
        return hash(self.id)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Quiz):
            return self.id == other.id
        return False

    @property
    def created(self) -> datetime:
        """Datetime quiz was created from ID"""
        return self.id.generation_time

    @classmethod
    async def by_title(cls, title: str) -> "Quiz":
        """Get a quiz by title"""
        return await cls.find_one(cls.title == title)

    @classmethod
    async def by_id(cls, _id: str) -> "Quiz":
        """Get a quiz by id"""
        return await cls.find_one(cls.id == PydanticObjectId(_id))
