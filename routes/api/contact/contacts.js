const express = require('express')
const {
  getCollection,
  getContactId,
  addContacts,
  deleteContact,
  updateContacts,
  updatefavoriteContact,
} = require('../../../controllers/contacts/index')
const { createValidation, updateValidation, updateStatusValidation, validateId, queryValidation } = require('../../../middlewares/validation/contactValidation.js')
const guard = require('../../../middlewares/guard/guard')
const router = express.Router()

router.get('/',[guard, queryValidation],  getCollection)

router.get('/:id',[guard, validateId], getContactId)

router.post('/',[guard, createValidation], addContacts)

router.delete('/:id', guard, deleteContact)

router.put('/:id',[ guard, validateId, updateValidation], updateContacts)

router.patch('/:id/favorite',[ guard, validateId, updateStatusValidation], updatefavoriteContact)

module.exports = router