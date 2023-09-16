"""
Quiz router
"""
from typing import Annotated

from fastapi import APIRouter, Depends, Response, Body, HTTPException
from beanie import WriteRules

from backend_service.models.user import User
from backend_service.models.quiz import Quiz, QuizOut, QuizUpdate, QuizCreate
from backend_service.util.jwt import get_current_user

router = APIRouter(prefix="/quiz", tags=["Quiz"])


@router.get("/{quiz_id}", response_model=QuizOut)
async def get_quiz(quiz_id: str):
    """Returns the specified quiz by id"""
    quiz = await Quiz.by_id(quiz_id)
    return quiz


@router.post("")
async def create_quiz(data: Annotated[QuizCreate, Body()],
                      user: Annotated[User, Depends(get_current_user)]):
    """Create quiz item for the authenticated user"""
    data = data.model_dump()
    quiz = Quiz(owner_id=user.id, **data)

    user.quizes_created.append(quiz)
    user.copy(update=user.dict(exclude_unset=True))
    await user.save(link_rule=WriteRules.WRITE)

    return quiz


@router.patch("/{quiz_id}", response_model=QuizOut)
async def update_quiz(quiz_id: str, update: Annotated[QuizUpdate, Body()],
                      user: Annotated[User, Depends(get_current_user)]):
    """Patch quiz item if authenticated user owns it """
    print(quiz_id)

    quiz = await Quiz.by_id(quiz_id)

    if quiz is None:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found!",
        )

    if quiz.owner_id != user.id:
        raise HTTPException(
            status_code=403,
            detail="User does not have permission to edit this quiz.",
        )
    quiz = quiz.copy(update=update.dict(exclude_unset=True))
    await quiz.save()
    return quiz


@router.delete("/{quiz_id}")
async def delete_quiz(quiz_id: str, user: Annotated[User, Depends(get_current_user)]):
    """Delete quiz item if authenticated user owns it """
    quiz = await Quiz.by_id(quiz_id)

    if quiz is None:
        raise HTTPException(
            status_code=404,
            detail="Quiz not found.",
        )

    if quiz.owner_id == user.id:
        await user.fetch_all_links()
        user.quizes_created.remove(quiz)
        await user.save()
        await quiz.delete()
        return Response(status_code=204)

    raise HTTPException(
        status_code=403,
        detail="User does not have permission to delete this quiz.",
    )
