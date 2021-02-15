let previousTimeout = null

const reducer = (state = '', action) => {
    switch(action.type){
        case 'SET_MESSAGE': return {text: action.text,  className:'message'}
        case 'SET_ERROR': return {text: action.text, className:'error'}
        case 'CLEAR': return ''
        default: return state
    }
}

/* Action creators */
export const setMessage = (text, sleepTime=5000) => {
    return async dispatch => {
        dispatch({type: 'SET_MESSAGE', text: text })
        clearTimeout(previousTimeout)
        previousTimeout = setTimeout(() => {dispatch({type: 'CLEAR'})}, sleepTime)
    }
}

export const setError = (text, sleepTime=5000) => {    
    return async dispatch => {
        dispatch({type: 'SET_ERROR', text: text})
        clearTimeout(previousTimeout)
        previousTimeout = setTimeout(() => {dispatch({type: 'CLEAR'})}, sleepTime)
    }
}


export default reducer