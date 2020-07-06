const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({})
        .then((blogs) => {
            response.json(blogs)
        })
        .catch((err) => console.log('err', err))
})

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog.save()
        .then((result) => {
            response.status(201).json(result)
        })
        .catch((err) => console.log('err', err))
})

module.exports = blogRouter