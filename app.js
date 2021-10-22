const express = require('express');
const app = express();
const {validateUser} = require('./middlewares/validate.mw');
const UserController = require('./controllers/user.controller');

const PORT = 3000;
const bodyParser = express.json();



app.post('/user', bodyParser, validateUser, UserController.createUser);
app.get('/users', UserController.getUsers);

app.get('/user/:id', UserController.getUser);
app.put('/user/:id');
app.delete('/user/:id');


app.listen(PORT, () => {
  console.log('server  is running');
});

/*
npm init -y
npm i express
npm i -D nodemon
nodemon ./app.js (package.json -> scripts -> start)
*/
