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

    //create new list of objects with the author names and the number of blogs. Decending order.
    const totalBlogs = _.chain(blogs)
        .groupBy('author')
        .map((blogs, name) => ({
            'author': name,
            'blogs': blogs.length
        }))
        .orderBy('blogs', 'desc')
        .value()
    return totalBlogs[0]
}

const mostLikes = (blogs) => {
    if (!blogs[0]) {
        return {}
    }
    const list = _.chain(blogs)
        .groupBy('author')
        //sum each authors likes and create new objects
        .map((blogs, name) => ({
            'author': name,
            'likes': _.sumBy(blogs, 'likes')
        }))
        .orderBy('likes', 'desc')
        .value()
    //console.log('***LIST***', list)
    return list[0]
}

module.exports = { dummy, totalLikes, mostBlogs, mostLikes, favouriteBlog }