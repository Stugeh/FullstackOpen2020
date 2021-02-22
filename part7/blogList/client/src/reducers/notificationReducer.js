let previousTimeout = null

const reducer = (state = '', action) => {
  switch(action.type){
  case 'SET_MESSAGE': return { text: action.text,  variant:'success' }
  case 'SET_ERROR': return { text: action.text, variant:'danger' }
  case 'CLEAR_MESSAGE': return ''
  default: return state
  }
}

/* Action creators */
export const setMessage = (text, sleepTime=5000) => {
  return async dispatch => {
    dispatch({ type: 'SET_MESSAGE', text: text })
    clearTimeout(previousTimeout)
    previousTimeout = setTimeout(() => {dispatch({ type: 'CLEAR_MESSAGE' })}, sleepTime)
  }
}

export const setError = (text, sleepTime=5000) => {
  return async dispatch => {
    dispatch({ type: 'SET_ERROR', text: text })
    clearTimeout(previousTimeout)
    previousTimeout = setTimeout(() => {dispatch({ type: 'CLEAR_MESSAGE' })}, sleepTime)
  }
}


export default reducer