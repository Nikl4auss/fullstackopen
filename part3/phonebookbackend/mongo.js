const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://nikl4auss:${password}@cluster0.xkwt9.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const contactScheema = new mongoose.Schema({
  name: String,
  number: Number,
  creationDate: Date,
  lastUpdateDate: Date,
});

const Contact = mongoose.model("Contact", contactScheema);

if (process.argv.length === 3) {
  let phonebook = `Phonebook: \n`;
  Contact.find({}).then((contacts) => {
    contacts.forEach(
      (contact) => (phonebook += `${contact.name} ${contact.number}\n`)
    );
    console.log(phonebook);
    mongoose.connection.close();
  });
}

if (process.argv.length > 4) {
  let contact = new Contact({
    name: process.argv[3],
    number: Number(process.argv[4]),
    creationDate: new Date(),
    lastUpdateDate: new Date(),
  });

  contact.save().then((result) => {
    console.log(`added ${contact.name} ${contact.number} to the phonebook`);
    mongoose.connection.close();
  });
}
