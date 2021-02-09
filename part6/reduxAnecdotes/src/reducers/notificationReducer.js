let previousTimeout = null

const reducer = (state = '', action) => {
    console.log('action :>> ', action);
    switch(action.type){
        case 'SET_NOTIFICATION': return action.text
        case 'CLEAR': return ''
        default: return state
    }
}

/* Action creators */
export const setNotification = (text, sleepTime=5000) => {
    return async dispatch => {
        dispatch({type: 'SET_NOTIFICATION', text: text})
        clearTimeout(previousTimeout)
        previousTimeout = setTimeout(() => {dispatch({type: 'CLEAR'})}, sleepTime)
    }
}


export default reducer