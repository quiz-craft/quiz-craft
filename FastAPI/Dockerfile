FROM python:3.10

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./backend_service /code/backend_service
COPY ./.env /code/

CMD ["uvicorn", "backend_service.main:app", "--host", "0.0.0.0", "--port", "3000"]
