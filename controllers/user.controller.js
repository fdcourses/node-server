const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  const { body: validatedUser } = req;

  const newUser = await User.create(validatedUser);

  res.status(201).send(newUser);
};

module.exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).send(users);
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const foundUser = await User.findById(id);

    res.status(200).send(foundUser);
  } catch (err) {
    res.status(404).send('USER NOT FOUND');
  }
};

/*
  Сначала юзера надо найти, если он есть то нужно найти его точое место в массиве с помощью findIndex.
  Потом создать новый его обьект в него закинуть все старые данные и все новые данные.
  Потом перезаписать им старый обьект в массиве и вернуть обновленный обьект.
  Если не нашли то отправляем 404
*/

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const foundUser = await User.findById(id);

    const updatedUser = await foundUser.update(body);

    res.status(200).send(updatedUser);

  } catch (err) {
    res.status(404).send('NOT FOUND');
  }  
};

/*
  Для удаления достаточно знать айдишник а дальше можно отфильтровать массив, 
  оставив все значения которые не совпадают с id, переданным в URL
  только массив users должен быть летовской переменной
  Если не нашли то отправляем 404
*/
module.exports.deleteUser = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  const deletedUserId = await User.deleteById(id);

  res.status(200).send(deletedUserId);
};
