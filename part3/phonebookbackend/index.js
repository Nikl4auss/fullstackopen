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

app.get("/api/contacts/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) =>
      contact ? response.json(contact) : response.status(404).end()
    )
    .catch((error) => next(error));
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

app.put("/api/contacts/:id", (request, response, next) => {
  const body = request.body;
  const { name, number } = body;
  if (!name || !number)
    return response.status(400).error({ error: "name or number missing" });
  const contact = {
    name,
    number,
    lastUpdateDate: new Date(),
  };
  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then((contactUpdated) => response.json(contactUpdated))
    .catch((error) => next(error));
});

app.delete("/api/contacts/:id", (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.message === "CastError")
    return response.status(400).send({ error: "malformatted id" });

  next(error);
};

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
