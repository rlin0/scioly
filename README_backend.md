## Setting up & Useful Commands

Activate your virtual env then\
`pip install -r requirements.txt`

To run the dev web server:\
`python manage.py runserver`

After changes to models:\
`make migrate`

To create a new superuser (for access to siteurl/admin):\
`python manage.py createsuperuser`

After adding anything to `static` folder you must run:\
`python manage.py collectstatic`

To clear all tables in the db: (Exercise with caution - all developers share the same db)\
`python manage.py flush`

To access the db:\
`python manage.py dbshell`

Fixing db cascade:\
`alter table game_inventory drop constraint game_inventory_user_id_a02ea019_fk_game_profile_id, add constraint game_inventory_user_id_a02ea019_fk_game_profile_id foreign key(user_id) references game_profile(id) on delete cascade;`

To lint:\
`make lint`

## DATABASES

Dev: PostgreSQL database hosted on AWS RDS\
Prod: PostgreSQL database hosted on Heroku

## Resources

Tutorial: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/development_environment

Site from last year (ty Helena): https://github.com/helenawu1998/gph-site
