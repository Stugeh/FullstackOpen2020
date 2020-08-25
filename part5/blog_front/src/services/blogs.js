import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// sets authorization token for requests
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// returns all entries in database
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


// sets authorization header for POST request and
// posts new object to database
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


// enables editing existing entries in the database.
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl} /${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }