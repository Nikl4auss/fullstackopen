const { response } = require('express');
const express = require('express');
const morgan = require("morgan")
const app = express()

morgan.token("body", (request, response) => JSON.stringify(request.body))

let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.get("/info", (request, response) => {
  response.end(`
  <p>Phonebook has info for ${contacts.length} people</p>
  <p>${Date()}</p>
  `)
})

app.get("/api/contacts", (request, response) => {
    response.json(contacts)
})

app.get("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)
  if(contact){
    response.json(contact)
  }
  else{
    response.statusMessage = "contact doesn't exist"
    response.status(404).end()
  }
})

app.post("/api/contacts", (request, response) => {
  const body = request.body

  if(!body.name || !body.number) return response.status(400).error({error: "name or number missing"})
  if(contacts.includes(contact => contact.name === body.name)) return response.status(400).error({error: "name must be unique"})

  const contact = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000)
  }

  contacts = contacts.concat(contact)
  response.json(contact)
})

app.delete("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id)
  contacts = contacts.filter(contact => contact.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})