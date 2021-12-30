const modul = require('../../model/contacts/index');

async function  getContact(_req, res, _next) {
  const contacts = await modul.listContacts();
  res.status(200).json(contacts);
}

module.exports = getContact;