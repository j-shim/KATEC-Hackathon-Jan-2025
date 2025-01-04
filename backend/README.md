# Backend

## Install dependencies

```bash
brew install pipenv

# Set virtual environment in project directory
export PIPENV_VENV_IN_PROJECT=1
# Install dependencies
pipenv install
# Activate virtual environment
pipenv shell
```

## Run dev server

```bash
# Apply migrations
./manage.py migrate
# Run server
./manage.py runserver
```

## Initialize mock data

```bash
# Refer to init_data.py for the mock data
./manage.py init_data
```

## Generate models graph

```bash
./manage.py graph_models app -o models.png
```

Refer to models.png for the models graph.
