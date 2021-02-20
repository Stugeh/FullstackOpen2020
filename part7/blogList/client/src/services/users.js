import axios from 'axios'
const baseUrl = '/api/users'


// returns all entries in database
const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}


const create = async newUser => {
  let response = await axios.post(baseUrl, newUser)
  return response
}

export default { create, getAll }