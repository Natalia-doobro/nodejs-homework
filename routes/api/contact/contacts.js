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
const router = express.Router()

router.get('/',queryValidation,  getCollection)

router.get('/:id',validateId, getContactId)

router.post('/',createValidation, addContacts)

router.delete('/:id', deleteContact)

router.put('/:id',updateValidation, updateContacts)

router.patch('/:id/favorite',updateStatusValidation, updatefavoriteContact)

module.exports = router