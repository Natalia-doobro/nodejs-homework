const Joi = require("joi");

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const createValidation = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ "message": `Missing required ${err.message.replace(/"/g, '').replace('is required', '')}field` });
  }
  
  next();
};

const updateValidation = async (req, res, next) => {
  try {
    await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === 'object.unknown') {
        return res.status(400).json({"message": err.message.replace(/"/g, '')})  
    }
    return res.status(400).json({"message": err.message.replace(/"/g, '')})
  }
    
  next();
};

module.exports = { createValidation, updateValidation }