const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Conecting to ", url);

mongoose
  .connect(url)
  .then((response) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB", error.message));

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  creationDate: Date,
  lastUpdateDate: Date,
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
