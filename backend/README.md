# Backend

## Install dependencies

```bash
brew install pipenv
# Below is for ./manage.py graph_models command
brew install graphviz

cd backend

# Set virtual environment in project directory
export PIPENV_VENV_IN_PROJECT=1
# Install dependencies
pipenv install
```

## Run dev server

```bash
# Apply migrations
pipenv run python manage.py migrate
# Run server
pipenv run python manage.py runserver
```

## Initialize mock data

```bash
# Refer to init_data.py for the mock data
pipenv run python manage.py init_data
```

## Generate models graph

```bash
pipenv run python manage.py graph_models app -o models.png
```

Refer to models.png for the models graph.
