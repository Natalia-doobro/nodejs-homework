const { readContent, writeContent } = require('fnContacts');

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

module.exports = updateContact;
