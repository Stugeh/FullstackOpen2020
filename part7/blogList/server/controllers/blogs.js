const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog')
const User = require('../models/user')
const { errorHandler } = require('../utils/middleware')
const logger = require('../utils/logger')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    if (blogs) {
        response.json(blogs)
    }
    else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: [],
        user: user._id
    })
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.json(newBlog)
})

blogRouter.put('/:id', async (req, res) => {
    logger.info('Updating....\n', req.body)
    const newBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(newBlog)
})


blogRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (blog.user.toString() === decodedToken.id) {
        logger.info('tokens match')
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } else {
        res.status(401).json({ error: 'invalid token' })
    }
})

blogRouter.post('/:id/comments', async (req, res) => {
    const comment = req.body.comment
    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(comment)
    await blog.save()
    res.json(blog.comments)
})

module.exports = blogRouter 