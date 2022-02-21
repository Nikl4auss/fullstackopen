const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://nikl4auss:${password}@cluster0.lssyx.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteScheema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteScheema);

// const note = new Note({
//   content: "HTML is Easy",
//   date: new Date(),
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => console.log(note));
  mongoose.connection.close();
});
