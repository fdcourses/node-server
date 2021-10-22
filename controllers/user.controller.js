const users = [];

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

  console.log(id);
  const foundUser = users.find((user) => {

    return Number(user.id) === Number(id);
  });

  if(foundUser) {
    res.send(foundUser);
  } else {
    res.status(404).send("USER NOT FOUND");
  }

}