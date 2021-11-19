const contactsOperations = require('./contacts');

//const contacts = listContacts();
//const contactById = getContactById(3);
//const updatedContacts = removeContact(3);

const newContact = contactsOperations.addContact("Mango", "mail@mail.ru", "222333");
