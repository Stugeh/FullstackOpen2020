import axios from 'axios'
const baseUrl = '/api/users'


const create = async newUser => {
    let response = await axios.post(baseUrl, newUser)
    return response
}

export default { create }