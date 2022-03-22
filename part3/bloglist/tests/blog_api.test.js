const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./blog_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for(let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('GET requests', () => {
    
    test('blogs are returned as JSON', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 10000)
    
    test('at the start, there should be 4 blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('when returned as JSON, blogs should have the id property', async () => {
        const blogs = await helper.blogsInDB()
        expect(blogs[0].id).toBeDefined()
    })
});

describe('POST request', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Something something blog",
            author: "Someone",
            url: "https://dontclickthislink.com/",
            likes: 10,
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('if likes is missing, it defaults to 0', async () => {
        const newBlog = {
            title: "Something something blog",
            author: "Someone",
            url: "https://dontclickthislink.com/",
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        console.log(blogsAtEnd[blogsAtEnd.length - 1])
        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    })

    test('if title or url are missing, the request is responded with 400', async () => {
        const newBlog = {
            author: "Someone",
            url: "https://dontclickthislink.com/",
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
});
afterAll(() => {
    mongoose.connection.close()
})