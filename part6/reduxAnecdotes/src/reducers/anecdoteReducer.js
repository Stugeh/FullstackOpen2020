const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  if(action.type === 'LIKE'){
    const id = action.data.id
    const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
    const newAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes+1} 
    state = state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote)
    // alphabetical order
    state = state.sort((a,b) => a.content < b.content ? 1 : -1)
    // sort by likes
    state = state.sort((a,b) => a.votes < b.votes ? 1 : -1)
    return state
  }
  
  if(action.type === 'CREATE'){
    return [...state, action.data]
  }

  return state
}

/* ACTION CREATORS */ 

export const addLike = (id) => {
  return {
    type: "LIKE",
    data: {id}
  }
}

export const createNewAnecdote = (text) => {
  const newAnecdote = asObject(text)
  return {
    type: "CREATE",
    data: newAnecdote
  }
}

export default reducer