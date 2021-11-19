const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const newContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

// TODO: задокументировать каждую функцию

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  //console.log("Все контакты:", contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  //console.log("Контакт с айди 3:", contactById);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await newContacts(updatedContacts);
  //console.log("Новый список контактов:", updatedContacts);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone };
  contacts.push(newContact);
  await newContacts(contacts);
  console.log("Новый контакт:", newContact);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
