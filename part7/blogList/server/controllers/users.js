const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

userRouter.post('/', async (request, response) => {
    const body = request.body
    if (body.password === undefined || body.password.length < 3) {
        logger.info('Password not ok')
        response.status(400).json({ error: 'malformated password' })
    } else if (body.name === undefined || body.username === undefined) {
        response.status(400).json({ error: 'all fields must have a value' })
    }
    else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.json(savedUser)
    }
})

userRouter.get('/', async (request, response) => {
    const userList = await User.find({}).populate('blogs', { user: 0, likes: 0 })
    if (userList) {
        response.json(userList)
    }
    else {
        response.status(404).end()
    }
})

module.exports = userRouter