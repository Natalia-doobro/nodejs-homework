const { readContent, writeContent } = require('fnContacts');

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const newList = contacts.filter(contact => contact.id !== contactId);
  await writeContent(newList);
  return newList;
}

module.exports = removeContact;