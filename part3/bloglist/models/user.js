const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userScheema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique']
    },
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userScheema.plugin(uniqueValidator)

userScheema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userScheema)

module.exports = User