# https://realpython.com/django-nginx-gunicorn/
# https://mattsegal.dev/django-gunicorn-nginx-logging.html

import multiprocessing

# The number of worker processes for handling requests
workers = multiprocessing.cpu_count() * 2 + 1
# The socket to bind
bind = "backend:8000"
# Write access and error info to:
accesslog = "/app/log/gunicorn/access.log"
errorlog = "/app/log/gunicorn/error.log"
# Redirect stdout/stderr to log file
capture_output = True

loglevel = "warning"
