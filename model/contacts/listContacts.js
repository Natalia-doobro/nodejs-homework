const { readContent } = require('fnContacts');

const listContacts = async () => {
  return await readContent();
}

module.exports = listContacts;