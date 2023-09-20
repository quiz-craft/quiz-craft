FROM python:3.10

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./backend_service /app/backend_service

CMD ["uvicorn", "backend_service.main:app", "--host", "0.0.0.0", "--port", "3000"]
