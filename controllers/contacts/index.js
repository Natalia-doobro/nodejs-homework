const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../../repository/contacts/index');

const {HttpCode, MESSAGE} = require('../../lib/constants')

const getCollection = async (req, res, _next) => {
  const { id: userId } = req.user;
  const contacts = await listContacts(userId, req.query);
  res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK , data:{...contacts}});
}

const getContactId = async (req, res, _next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contacts = await getContactById(userId, id);

  if (contacts) {
    return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK , data:{contacts}});
  }
  
  res.status(HttpCode.NOT_FOUND).json({status: 'error', code: HttpCode.NOT_FOUND , message: MESSAGE.ERROR});
}

const addContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await addContact(userId, req.body);
  if (contacts) {
    return res.status(HttpCode.CREATED).json({status: 'success', code: HttpCode.CREATED , data:{contact: contacts}});
  }
  res.status(HttpCode.NOT_FOUND).json({status: 'error', code: HttpCode.NOT_FOUND , message: MESSAGE.ERROR});
}

const deleteContact = async (req, res, _next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contacts = await removeContact(userId, id);
  if (contacts) {
   return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK , message: MESSAGE.DELETED});
  }
  res.status(HttpCode.NOT_FOUND).json({status: 'error', code: HttpCode.NOT_FOUND , message: MESSAGE.ERROR});
}

const updateContacts = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contacts = await updateContact(userId, id, req.body);
  if (contacts) {
    return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK , data:{contacts}});
  }
  
  res.status(HttpCode.NOT_FOUND).json({status: 'error', code: HttpCode.NOT_FOUND , message: MESSAGE.ERROR});
}

const updatefavoriteContact =  async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contacts = await updateStatusContact(userId, id, req.body);
  if (contacts) {
    return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK , data:{contacts}});
  }
  
  res.status(HttpCode.NOT_FOUND).json({status: 'error', code: HttpCode.NOT_FOUND , message: MESSAGE.ERROR});
}

module.exports = {
  getCollection,
  getContactId,
  addContacts,
  deleteContact,
  updateContacts,
  updatefavoriteContact,
}