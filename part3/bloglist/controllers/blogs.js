const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
  })

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const likes = {
    likes: request.body.likes
  } 
  const updatedBlog = await Blog.findByIdAndUpdate(id, likes, {new: true, runValidators: true, context:'query'})
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter