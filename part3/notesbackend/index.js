require("dotenv").config();
const { response, request } = require("express");
const cors = require("cors");
const express = require("express");
const Note = require("./models/note");
const app = express();
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
const genereateId = () => {
  const maxID =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;

  return maxID + 1;
};

app.get("/", (request, response) => {});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((findedNote) =>
      findedNote ? response.json(findedNote) : response.status(404).end()
    )
    .catch((error) => next(error));
});

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content)
    return response.status(400).json({ error: "content missing" });
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });
  note.save().then((savedNote) => response.json(savedNote));
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  if (!body.content)
    return response.status(400).json({ error: "content missing" });
  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => response.json(updatedNote))
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
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

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
