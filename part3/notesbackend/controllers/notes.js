/* eslint-disable no-trailing-spaces */
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const findedNote = await Note.findById(id)
  findedNote
    ? response.json(findedNote)
    : response.status(404).end()
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
  const savedNote = await note.save()
  response.status(201).json(savedNote)

})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => response.json(updatedNote))
    .catch((error) => next(error))
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter