const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname,'../../db', 'contacts.json');

const readContent = async () => {
    const contact = await fs.readFile(contactsPath, 'utf8',);
    const result = JSON.parse(contact);
    return result;
}

const writeContent = async (contact) => {
    const newcontact = await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
    return newcontact;
}


const listContacts = async () => {
  return await readContent();
}
const getContactById = async (contactId) => {
  const contacts = await readContent();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
}
const removeContact = async (contactId) => {
  const contacts = await readContent();
  const newList = contacts.filter(contact => contact.id !== contactId);
  await writeContent(newList);
  return newList;
}
const addContact = async (body) => {
  const contacts = await readContent();
  const newContact = {id: crypto.randomUUID(), ...body}
  contacts.push(newContact)
  await writeContent(contacts);
  return newContact;
}
const updateContact = async (contactId, body) => {
  const contacts = await readContent();
  const updatedContact = contacts.find((contact) => contact.id === contactId);
  const index = contacts.indexOf(updatedContact);
  
  if (index !== -1) {
    const updatedContact = { id: contactId,...contacts[index], ...body };
    contacts[index] = updatedContact;
    await writeContent(contacts);
    return updatedContact;
  } 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}