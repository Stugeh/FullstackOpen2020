const _ = require('lodash')
const dummy = blogs => {
    return 1
}

const totalLikes = (blogs) => {
    likesTot = blogs.reduce((sum, blog) => sum += blog.likes, 0)
    return likesTot
}

const favouriteBlog = (blogs) => {
    //discard empty lists
    if (!blogs[0]) {
        return {}
    }
    //find object with most likes
    const max = blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr)
    //console.log('max', max)
    return {
        title: max.title,
        author: max.author,
        likes: max.likes
    }
}

const mostBlogs = (blogs) => {
    //discard empty lists
    if (!blogs[0]) {
        return {}
    }
    //set list to a list of blogs grouped by authors 
    //and order so that the author with most blogs is first
    const list = _.chain(blogs)
        .groupBy('author')
        .orderBy('length', 'desc')
        .value()

    const blogger = {
        author: list[0][0].author,
        blogs: list[0].length
    }
    //console.log('blogger with most blogs:>> ', blogger);
    return blogger
}

const mostLikes = (blogs) => {
    const list = _.chain(blogs)
        .groupBy('author')
}

module.exports = { dummy, totalLikes, mostBlogs, mostLikes, favouriteBlog }