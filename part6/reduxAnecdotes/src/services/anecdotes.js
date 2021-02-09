import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (text) => {
    const object = { content: text, id: getId(), votes:0}
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateAnecdote = async ( anecdote ) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}
  
export default { getAll, createNew, updateAnecdote }