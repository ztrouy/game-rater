#!/bin/bash

rm db.sqlite3
rm -rf ./raterapi/migrations
python manage.py migrate
python manage.py makemigrations raterapi
python manage.py migrate raterapi
python manage.py loaddata users
python manage.py loaddata tokens
python manage.py loaddata games
python manage.py loaddata categories
python manage.py loaddata game_categories
python manage.py loaddata reviews
python manage.py loaddata ratings

