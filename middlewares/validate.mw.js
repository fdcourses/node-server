const yup = require('yup');

const USER_SCHEMA = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  gender: yup.string().required(),
});

module.exports.validateUser = async (req, res, next) => {
  try {
    await USER_SCHEMA.validate(req.body);

    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};
