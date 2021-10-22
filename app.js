const express = require('express');
const app = express();
const {validateUser} = require('./middlewares/validate.mw');
const UserController = require('./controllers/user.controller');

const PORT = 3000;
const bodyParser = express.json();



app.post('/user', bodyParser, validateUser, UserController.createUser);
app.get('/users', UserController.getUsers);

app.get('/user/:id', UserController.getUser);
/*
    Обновление юзера так же связано с получением данных из JSON
    и их также надо парсить и проверить на валидность как и на POST маршруте
    Надо при этом не забыть что все поля которые указаны как обязательные должны быть отправлены в запросе
    иначе валидатор выкинет ошибку
*/
app.put('/user/:id', bodyParser, validateUser, UserController.updateUser);
/*
    Для удаления юзера ничего кроме айдишки знать не нужно, а её мы передали в пути
*/
app.delete('/user/:id',UserController.deleteUser);


app.listen(PORT, () => {
  console.log('server  is running');
});

/*
npm init -y
npm i express
npm i -D nodemon
nodemon ./app.js (package.json -> scripts -> start)
*/
