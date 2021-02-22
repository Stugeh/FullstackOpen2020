
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type){
        case 'INIT_BLOGS': return action.data
        case 'CREATE_BLOG': return [...state, action.data]
        case 'DELETE_BLOG': return action.data
        case 'ADD_COMMENT': 
            const blog = state.find(blog => blog.id === action.data.blog)
            const newBlog = {...blog, comments: action.data.comments}
            console.log('newBlog :>> ', newBlog);
            const newState = state.map( blog => blog.id !== action.data.blog ?
                blog : newBlog)
            return newState
        case 'LIKE_BLOG':
            return state.map( blog => blog.id !== action.data.id ?
                         blog : action.data)
                         .sort((a,b) => a.content < b.content ? 1 : -1)
                         .sort((a,b) => a.likes < b.likes ? 1 : -1)
        default: return state
    }
    
}

/* Action creators */

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
          type: 'INIT_BLOGS',
          data: blogs.sort((a, b) => a.likes - b.likes).reverse()
        })
    }
  }

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({type:'CREATE_BLOG', data: newBlog})
    }
}

export const deleteBlog = (blog) => {
    return async dispatch =>{
        const blogs = await blogService.removeBlog(blog.id) 
        dispatch({type:'DELETE_BLOG', data: blogs})
    }
}

export const likeBlog = (blog) => {    
    return async dispatch => {
        const newBlog = await blogService
            .update(blog.id, {...blog, likes: blog.likes + 1, user: blog.user.id})
        dispatch({type: 'LIKE_BLOG', data: {...newBlog, user: blog.user}})
    }
}

export const addComment = (comment, blog) => {
    return async dispatch => {
        const comments = await blogService.createComment(blog.id, comment)
        dispatch({type: 'ADD_COMMENT', data: {blog: blog.id, comments}})
    }
}

export default reducer