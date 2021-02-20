import blogService from '../services/blogs'
import userService from '../services/users'

const reducer = (state = {loggedInUser: null, allUsers: []}, action) => {
    switch (action.type){
        case 'INIT_USERS': return {...state, allUsers: action.data}
        
        case 'RETRIEVE':
            blogService.setToken(action.data.token)
            return {...state, loggedInUser: action.data}

        case 'LOGIN':
            window.localStorage.setItem('loggedInUser', JSON.stringify(action.data))
            blogService.setToken(action.data.token)
            return {...state, loggedInUser: action.data}

        case 'LOGOUT': 
            window.localStorage.removeItem('loggedInUser')
            return {...state, loggedInUser: null}

        case 'CREATE':
            break
        default: return state
    }
}

/* Action creators */

export const initializeUsers = () => {
    return async dispatch => {
      const users = await userService.getAll()
      dispatch({
          type: 'INIT_USERS',
          data: users.sort((a, b) => a.blogs.length - b.blogs.length).reverse()
        })
    }
  }

export const login = (user) => {
    return dispatch => { 
        dispatch({type:'LOGIN', data: user})
    }
}

export const logout = () => {    
    return dispatch => {
        dispatch({type:'LOGOUT'})
    }
}

export const createUser = () => {    
    return async dispatch => {
    }
}

export const retrieveUser = (user) => {
    return dispatch => {
        dispatch({type: 'RETRIEVE', data: user})
    }
}


export default reducer