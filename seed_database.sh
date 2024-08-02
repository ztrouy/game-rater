#!/bin/bash

rm db.sqlite3
rm -rf ./raterapi/migrations
python manage.py migrate
python manage.py makemigrations raterapi
python manage.py migrate raterapi
python manage.py loaddata users
python manage.py loaddata tokens

