import blogService from '../services/blogs'

const reducer = (state = null, action) => {
    switch (action.type){
        case 'RETRIEVE':
            blogService.setToken(action.data.token)
            return action.data
        case 'LOGIN':
            window.localStorage.setItem('loggedInUser', JSON.stringify(action.data))
            blogService.setToken(action.data.token)
            return action.data
        case 'LOGOUT': 
            window.localStorage.removeItem('loggedInUser')
            return null
        case 'CREATE':
        default: return state
    }
}

/* Action creators */
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