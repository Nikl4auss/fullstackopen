/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Contact = require('./models/contact');

const app = express();

morgan.token('body', (request) => JSON.stringify(request.body));

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'),
);
app.get('/info', (request, response) => {
  Contact.find({}).then((contacts) => {
    response.end(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${Date()}</p>
  `);
  });
});

app.get('/api/contacts', (request, response) => {
  Contact.find({}).then((contacts) => response.json(contacts));
});

app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => (contact ? response.json(contact) : response.status(404).end()))
    .catch((error) => next(error));
});

app.post('/api/contacts', (request, response, next) => {
  const { body } = request;
  const { name, number } = body;

  const contact = new Contact({
    name,
    number,
    creationDate: new Date(),
    lastUpdateDate: new Date(),
  });

  contact
    .save()
    .then((savedContact) => response.json(savedContact))
    .catch((error) => next(error));
});

app.put('/api/contacts/:id', (request, response, next) => {
  const { body } = request;
  const { name, number } = body;
  const contact = {
    name,
    number,
    lastUpdateDate: new Date(),
  };
  Contact.findByIdAndUpdate(request.params.id, contact, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((contactUpdated) => response.json(contactUpdated))
    .catch((error) => next(error));
});

app.delete('/api/contacts/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' });
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
