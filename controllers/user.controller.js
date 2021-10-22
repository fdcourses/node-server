let users = [];

module.exports.createUser = (req, res, next) => {
  const { body: validatedUser } = req;

  validatedUser.id = users.length;
  validatedUser.passwordHash = 'HASGsdafgdssar32849y32';

  delete validatedUser.password;

  users.push(validatedUser);

  delete validatedUser.passwordHash;

  res.status(201).send(validatedUser);
}

module.exports.getUsers = (req, res, next) => {

  res.status(200).send(users);
}

module.exports.getUser = (req, res, next) => {
  const {params: {id}} = req;

  const foundUser = users.find((user) => {

    return Number(user.id) === Number(id);
  });

  if(foundUser) {
    res.send(foundUser);
  } else {
    res.status(404).send("USER NOT FOUND");
  }

}

/*
  Сначала юзера надо найти, если он есть то нужно найти его точое место в массиве с помощью findIndex.
  Потом создать новый его обьект в него закинуть все старые данные и все новые данные.
  Потом перезаписать им старый обьект в массиве и вернуть обновленный обьект.
  Если не нашли то отправляем 404
*/

module.exports.updateUser = (req, res,next) => {
  const {params : {id}, body} = req;

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if(userIndex !== -1) {
  
    const updatedUser = {
      ...users[userIndex],
      ...body,
  
    }
    delete updatedUser.password; // убираем пароль опять

    users[userIndex] = updatedUser;


    res.status(200).send(updatedUser);
  } else{
    res.status(404).send("USER NOT FOUND");
  }
}

/*
  Для удаления достаточно знать айдишник а дальше можно отфильтровать массив, 
  оставив все значения которые не совпадают с id, переданным в URL
  только массив users должен быть летовской переменной
  Если не нашли то отправляем 404
*/
module.exports.deleteUser = (req, res, next) => {
  const {params : {id}} = req;

  const userIndex = users.findIndex((user) => user.id === Number(id));

  if(userIndex !== -1) {
    users = users.filter((user) => user.id !== Number(id));

    // можем отправить на клиент айдишку удаленного юзера чтобы он там сам его у себя удалил
    res.status(200).send(id);
  } else {
    res.status(404).send("USER NOT FOUND");
  }
}
