
import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type){
        case 'INIT_BLOGS': return action.data
        case 'CREATE': return [...state, action.data]
        case 'DELETE': return action.data
        case 'LIKE':
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
        dispatch({type:'CREATE', data: newBlog})
    }
}

export const deleteBlog = (blog) => {
    return async dispatch =>{
        const blogs = await blogService.removeBlog(blog.id) 
        dispatch({type:'DELETE', data: blogs})
    }
}

export const likeBlog = (blog) => {    
    return async dispatch => {
        const newBlog = await blogService
            .update(blog.id, {...blog, likes: blog.likes + 1, user: blog.user.id})
        dispatch({type: 'LIKE', data: newBlog})
    }
}

export default reducer