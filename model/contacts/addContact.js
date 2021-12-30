const {readContent, writeContent} = require('fnContacts');
const crypto = require('crypto')

const addContact = async (body) => {
  const contacts = await readContent();
  const newContact = {id: crypto.randomUUID(), ...body}
  contacts.push(newContact)
  await writeContent(contacts);
  return newContact;
}

module.exports = addContact;