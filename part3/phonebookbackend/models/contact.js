const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const url = process.env.MONGODB_URI;

console.log("Conecting to ", url);

mongoose
  .connect(url)
  .then((response) => console.log("Connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB", error.message));

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Contact name must be at least 3 characters long"],
    required: [true, "Contact Name Required!"],
    unique: [true, "Name must be unique"],
  },
  number: {
    type: String,
    minlength: [8, "phone number must be at least 8 characters long"],
    required: [true, "phonenumber is required"],
    validate: {
      validator: (value) => /\d{2,3}-\d*/.test(value),
      message: (props) => `${props.value} it's not a valid phone number`,
    },
  },
  creationDate: {
    type: Date,
    required: true,
  },
  lastUpdateDate: {
    type: Date,
    required: true,
  },
});

contactSchema.plugin(uniqueValidator);

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
