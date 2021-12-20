const express = require('express')
const model = require('../../model/index')
const { createValidation, updateValidation } = require('./validation')
const router = express.Router()

router.get('/', async (_req, res, _next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
})

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const contacts = await model.getContactById(id);

  if (contacts) {
    return res.status(200).json(contacts);
  }
  
  res.status(404).json({"message": "Not found"});
})

router.post('/',createValidation, async (req, res, next) => {
  const contacts = await model.addContact(req.body);
  if (contacts) {
     res.status(201).json(contacts);
  }
  res.status(404).json({"message": "Not found"});
})

router.delete('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const contacts = await model.removeContact(id);
  if (contacts) {
    return res.status(200).json({"message": "contact deleted"});
  }
  res.status(404).json({"message": "Not found"});
})

router.put('/:id',updateValidation, async (req, res, next) => {
 const { id } = req.params;
  const contacts = await model.updateContact(id, req.body);
  if (contacts) {
    return res.status(200).json(contacts);
  }
  
  res.status(404).json({"message": "Not found"});
})

module.exports = router
