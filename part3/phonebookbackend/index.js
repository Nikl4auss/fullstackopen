require("dotenv").config();
const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/contact");
const app = express();

morgan.token("body", (request, response) => JSON.stringify(request.body));

app.use(express.static("build"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.get("/info", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.end(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${Date()}</p>
  `);
  });
});

app.get("/api/contacts", (request, response) => {
  Contact.find({}).then((contacts) => response.json(contacts));
});

app.get("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  const contact = contacts.find((contact) => contact.id === id);
  if (contact) {
    response.json(contact);
  } else {
    response.statusMessage = "contact doesn't exist";
    response.status(404).end();
  }
});

app.post("/api/contacts", (request, response) => {
  const body = request.body;
  const { name, number } = body;
  if (!name || !number)
    return response.status(400).error({ error: "name or number missing" });

  const contact = new Contact({
    name,
    number,
    creationDate: new Date(),
    lastUpdateDate: new Date(),
  });

  contact.save().then((savedContact) => response.json(savedContact));
});

app.delete("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter((contact) => contact.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
