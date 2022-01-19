const Joi = require("joi");
const mongoose = require('mongoose');
const { MIN_AGE, MAX_AGE } = require('../../lib/constants');

const { Types } = mongoose;


const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).optional(),
  favorite: Joi.bool().optional(),
}).or("name", "email", "phone", "age");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const querySchema = Joi.object({
  // eslint-disable-next-line prefer-regex-literals
  limit: Joi.string().pattern(new RegExp('\\d+')).optional(),
  skip: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("id", "name", "email", "phone", "age", "favorite").optional(),
  sortByDesc: Joi.string().valid("id", "name", "email", "phone", "age", "favorite").optional(),
  filter: Joi.string()
    // eslint-disable-next-line prefer-regex-literals
    .pattern(new RegExp('(name|email|phone|age|favorite)\\|?(name|email|phone|age|favorite)+'))
    .optional(),
});

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
    if (type === 'object.missing') {
        return res.status(400).json({"message": 'missing fields'})  
    }
    return res.status(400).json({"message": err.message.replace(/"/g, '')})
  }
    
  next();
};

const updateStatusValidation = async (req, res, next) => {
  try {
    await updateFavoriteSchema.validateAsync(req.body);
  } catch (err) {
    const [{ type }] = err.details;
    if (type === 'object.missing') {
        return res.status(400).json({"message": "missing field favorite"})  
    }
    return res.status(400).json({"message": err.message.replace(/"/g, '')})
  }
    
  next();
};

const validateId = async (req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
     return res.status(400).json({"message": "Invalig ObjectId"})
   }
  next();
};

const queryValidation = async (req, res, next) => {
  try {
    await querySchema.validateAsync(req.query);
  } catch (err) {
    return res.status(400).json({ "message": `Missing required ${err.message.replace(/"/g, '').replace('is required', '')}field` });
  }
  
  next();
};

module.exports = { createValidation, updateValidation, updateStatusValidation, validateId, queryValidation }