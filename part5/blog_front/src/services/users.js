import axios from 'axios'
const baseUrl = '/api/users'


const create = async newUser => {
    const response = await axios.post(baseUrl, newUser)
    console.log('response :>> ', response.data);
    return response.data
}

export default { create }