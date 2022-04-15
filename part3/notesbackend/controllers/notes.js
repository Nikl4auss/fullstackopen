const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const userReturner = require('../utils/userReturner')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const findedNote = await Note.findById(id).populate('user', { username: 1, name: 1 })
  findedNote
    ? response.json(findedNote)
    : response.status(404).end()
})

notesRouter.post('/', userReturner , async (request, response) => {
  const body = request.body
  const { userId } = request
  console.log(userId)
  const user = await User.findById(userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  console.log(user.notes)
  await user.save()
  response.status(201).json(savedNote)

})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  response.json(updatedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter