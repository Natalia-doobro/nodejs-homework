const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});



const registrationValidation = async (req, res, next) => {
  try {
    await registrationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ "message": `Missing required ${err.message.replace(/"/g, '').replace('is required', '')}field` });
  }
  
  next();
};

const loginValidation = async (req, res, next) => {
  try {
    await loginSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ "message": `Missing required ${err.message.replace(/"/g, '').replace('is required', '')}field` });
  }
  
  next();
};

module.exports = { registrationValidation, loginValidation }