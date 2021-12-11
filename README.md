# swpp2021-team5
[![Build
           Status](https://travis-ci.com/swsnu/swpp2021-team5.svg?branch=main)](https://travis-ci.com/swsnu/swpp2021-team5)
[![Quality Gate
           Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2021-team5&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2021-team5)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2021-team5/badge.svg?branch=main)](https://coveralls.io/github/swsnu/swpp2021-team5?branch=main)

Welcome to KitchenVesta! Our service aims to let help people get customized menu recommendation for every meal, according to your nutritional information and preferences(no recommendation on menus that include ingredients you do not eat).

You can see more details about our service at our wiki page: https://github.com/swsnu/swpp2021-team5/wiki 

## How to build the service
### Frontend
#### Run
`cd frontend/vesta/`

`yarn install`

`yarn start`

#### Test
`cd frontend/vesta/`

`yarn test --coverage --watchAll=false`

-----
### Backend
#### Run
`cd backend/vesta/`

`pip install -r requirements.txt`

`python manage.py makemigrations kitchen`

`python manage.py makemigrations recommend`

`python manage.py migrate`

`python manage.py runserver`

#### Test
`cd backend/vesta/`

`coverage run --source='.' manage.py test`

`coverage report -m`
