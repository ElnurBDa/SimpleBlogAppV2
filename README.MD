# A simple Blog App

![schema](images/schema.png)

## Functionalities

- create a post
- see other posts
- delete a post

## Tech Stack

- Frontend - `ReactJS` + `MUI`
- Backend - `ElysiaJS` + `BunJS` + `Prisma`
- DB - `PostgreSQL`

## Running it

- setup enviromental variables in `.env`

```bash
docker compose up -d
# If it is your first deployment

bun prisma migrate dev
```

## Tests

```bash
cd back
bun test

cd ..

cd front
npm test
```

## Some Images

- Main Page

> ![alt text](images/main.png)

- Add a Post

> ![alt text](images/add.png)

- See a Post

> ![alt text](images/posts.png)

- Bakend API's Swagger

> ![alt text](images/swagger.png)

- Log Dashboard

> ![elk](images/elk.png)
