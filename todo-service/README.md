# TODO service example
This is example project backend service
\
\
The server logs all API requests it performs to the terminal, so you can see what's going on even without diving into the code.

## Running the server
Before running you need setup nodejs enviroment on local. Open command line and and relocate to project folder\
You can setup in here
https://nodejs.org/en/download \
After setup environment pull code and run command line
```
npm run dev
```

### Config
Port and jwt secret config on .env file
```
PORT=8000
JWT_SECRET=qwr912u09u102
```
Database config is db.config.ts can use mysql, mssql, postgres
```
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../database.sqlite"
});
```
Run test
```
npm run test
```

### User action
Need register user for create todo
### Auth API

```POST /auth/login``` login 

```PUT /password``` change password require old password

Attact ```accessToken``` response of login api to header request with name ```authorization```

### User API

```POST /users/register``` for register new

```GET /users``` list user

```GET /users/:id``` get infor user by id

```PUT /users``` update user information

```DELETE /users``` delete authorized user need password confirm 
### Todo API (need auth)

```GET /todos``` get all todo of authorized user

```GET /todos/:id``` get todo by id

```POST /todos``` create new todo

```PUT /todos``` update existed todo

```DELETE /todos/:id``` delete todo by id