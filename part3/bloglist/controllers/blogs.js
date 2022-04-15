const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const {body, userId} = request
  
    const user = await User.findById(userId)
    console.log(user)
    const blog = new Blog({
      title: body.title,
      url: body.url,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    console.log(user.blogs)
    user.blogs = user.blogs.concat(savedBlog._id)
    console.log(user.blogs)
    await user.save()
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
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  if(blog.user.toString() === request.userId){
    await Blog.findByIdAndDelete(blog.id)
    console.log('Deleted!')
  }
  else{
    console.log("authorization failed")
  }
  response.status(204).end()
})

module.exports = blogsRouter