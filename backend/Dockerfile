# This is the backend Dockerfile which
# defines how the backend container is
# built.
FROM python:3.6

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE backend.settings.docker

RUN pip install --upgrade pip

WORKDIR /backend/

COPY . /backend/

RUN pip install -r requirements.txt
