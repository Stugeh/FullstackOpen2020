const mongoose = require('mongoose')
const config = require('../utils/config')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

module.exports = mongoose.model('Blog', blogSchema)