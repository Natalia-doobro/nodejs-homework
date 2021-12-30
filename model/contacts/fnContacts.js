const fs = require('fs/promises');
const path = require('path')

const contactsPath = path.join(__dirname,'../db', 'contacts.json');

const readContent = async () => {
    const contact = await fs.readFile(contactsPath, 'utf8',);
    const result = JSON.parse(contact);
    return result;
}

const writeContent = async (contact) => {
    const newcontact = await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
    return newcontact;
}

module.exports = {
  readContent,
  writeContent ,
}