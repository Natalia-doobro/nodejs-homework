
// const addContact = async (body) => {
//   const contacts = await readContent();
//   const newContact = {id: crypto.randomUUID(), ...body}
//   contacts.push(newContact)
//   await writeContent(contacts);
//   return newContact;
// }
// const updateContact = async (contactId, body) => {
//   const contacts = await readContent();
//   const updatedContact = contacts.find((contact) => contact.id === contactId);
//   const index = contacts.indexOf(updatedContact);
  
//   if (index !== -1) {
//     const updatedContact = { id: contactId,...contacts[index], ...body };
//     contacts[index] = updatedContact;
//     await writeContent(contacts);
//     return updatedContact;
//   }
// }

const db = require('../../db/db');
const { ObjectId } = require('mongodb');

const readCollection = async (db, name) => { 
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
}

const listContacts = async () => {
  const collection = await readCollection(db, 'contacts');
  const result = await collection.find().toArray();
  return result;
}

const getContactById = async (contactId) => {
  const collection = await readCollection(db, 'contacts');
  const id = ObjectId(contactId);
  const [result] = await collection.find({_id: id}).toArray();
  return result;
}

const removeContact = async (contactId) => {
  const collection = await readCollection(db, 'contacts');
  const id = ObjectId(contactId);
  const {value: result} = await collection.findOneAndDelete({_id: id});
  return result;
}

const addContact = async (body) => {
  const collection = await readCollection(db, 'contacts');
  const newContact = { ...body, favorite: false, };
  const result = await collection.insertOne(newContact);
  return result;
}

const updateContact = async (contactId, body) => {
  const collection = await readCollection(db, 'contacts');
  const id = ObjectId(contactId);
  const {value: result} = await collection.findOneAndUpdate({_id: id}, {$set: body}, {returnDocument: "after"});
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}