FROM python:3.13.1-alpine AS backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV DJANGO_SETTINGS_MODULE=config.settings.prod

WORKDIR /app/backend

# Generate requirements file with:
# pipenv requirements > requirements.prod.txt
COPY ./backend/requirements.prod.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.prod.txt

#############################################

FROM node:22-alpine as frontend-builder

WORKDIR /app/frontend

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./frontend/package*.json ./
RUN npm update -g npm \
    && npm clean-install

# Bundle app source
COPY ./frontend .

RUN npm run build

#############################################

FROM nginx:alpine AS frontend
COPY --from=frontend-builder --chown=nginx:nginx /app/frontend/dist/ /app/frontend/dist/
