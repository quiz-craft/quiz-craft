FROM python:3.10

WORKDIR /robot

COPY ./requirements.txt /robot/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /robot/requirements.txt

COPY ./data data/
COPY ./libraries libraries/
COPY ./keywords keywords/
COPY ./tests tests/

ENV PYTHONPATH=/robot/libraries

CMD ["robot", "tests"]
