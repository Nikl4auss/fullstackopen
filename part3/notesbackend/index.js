require("dotenv").config();
const { response } = require("express");
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

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findById(id)
    .then((findedNote) => response.json(findedNote))
    .catch((error) => {
      response.statusMessage = "Note doesn't exist";
      response.status(404).end();
    });
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

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id === id);
  console.log("Note deleted");
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
