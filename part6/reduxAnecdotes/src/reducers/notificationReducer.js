const initialNotification = ''

const reducer = (state = initialNotification, action) => {
    switch(action.type){
        case 'NEW_ANECDOTE':
            return 'Created new anecdote'
        case 'LIKE_ANECDOTE':
            return `Liked anecdote: "${action.data.content}"!`
        case 'CLEAR':
            return ''
        default: return state
    }
    
}

/* Action creators */

export const addedNotif = () => ({type: 'NEW_ANECDOTE'})
export const likeNotif = (content) => ({type: 'LIKE_ANECDOTE', data:{content}})
export const clearNotification = () => ({type: 'CLEAR'})

export default reducer