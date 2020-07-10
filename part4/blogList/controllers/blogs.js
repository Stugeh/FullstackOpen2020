const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { errorHandler } = require('../utils/middleware')
const logger = require('../utils/logger')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    if (blogs) {
        response.json(blogs)
    }
    else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.json(newBlog)
})

blogRouter.put('/:id', async (req, res) => {
    logger.info('Updating....\n', req.body)
    console.log('req.body :>> ', req.body)
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(newBlog)
})

blogRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogRouter