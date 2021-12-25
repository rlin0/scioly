lint:
	yapf -i -r .

migrate:
	python3 manage.py makemigrations game
	python3 manage.py migrate
