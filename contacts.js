const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const newContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(
    (contact) => String(contact.id) === contactId
  );
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => String(contact.id) === contactId);
  if (idx === -1) {
    return null;
  }
  const updatedContacts = contacts.filter((_, index) => index !== idx);
  await newContacts(updatedContacts);
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await newContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
