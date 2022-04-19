# Requirement

- Nodejs
- Docker
- Sendgrid (email provider)

## Getting started

1. start the database instance in docker
   1. `cd back-end`
   1. `docker compose up`
1. install dependencies
   - backend
     1. `cd back-end`
     1. `npm i`
   - frontend
     1. `cd front-end`
     1. `npm i`
1. create `.env` files and fill in this info
   ```
       JWT_SECRET = secret
       DB_NAME = reactauth
       DB_USER = root
       DB_PASS = root
       DB_PORT = 27017
       SENDGRID_API_KEY = xxxxx
   ```
1. start both frontend and backend
   - `cd front-end`
   - `npm run start`
   - `cd back-end`
   - `npm run start`
