# Test Data UI

## Structure

``` bash
├── apis/ # Django app for REST APIs
├── db/ # Sqlite database file folder
├── frontend/ # React app for UI, builds into static/
├── static/ # Django static folder
├── tdui/ # Django project main app
├── templates/ # Django templates, holder for react container
├── docker-compose.yaml 
├── dockerfile
├── manage.py
├── package.json
├── README.MD
├── requirements.txt
├── tsconfig.json
└── webpack.config.js
```

## Dev 

### Prerequisites
- Python
- Node

### Dependencies
1. Initiate python virtual environment
`python -m venv .venv` 
2. Activate python virtual environment
`.venv/Scripts/activate` (Windows) or `source .venv/bin/activate` (macOS/Linux)
3. Install python dependencies
`pip install -r requirements.txt`
4. Install node dependencies
`npm install`

### Migrate Database
`python manage.py migrate`

### Create .env File
Create a `.env` file under project root with the following content:
``` properties
SECRET_KEY={GENERATE_YOUR_OWN_AND_PUT_HERE}
DEBUG=True
DJANGO_ALLOWED_HOSTS=127.0.0.1
```

### Run Server in Development Mode
1. Watch react changes 
`npm run dev`
2. Run Django server
(In another terminal window) `python manage.py runserver`

### Sync with Test Data Repository
Hit `127.0.0.1:8000/api/load` endpoint.

## Deploy

### Prerequisites
- Docker
- Docker Compose

### Create .env File
Create a `.env` file under project root with the following content:
``` properties
SECRET_KEY={GENERATE_YOUR_OWN_AND_PUT_HERE}
DEBUG=False
DJANGO_ALLOWED_HOSTS={Comma separated list of allowed hosts}
```

### Run container
`docker compose up`

### Migrate Database
On first run, `docker-compose run test-data-ui python manage.py migrate`

### Sync with Test Data Repository
Hit `{SERVER:PORT}/api/load` endpoint.