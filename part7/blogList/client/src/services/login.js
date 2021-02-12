import axios from 'axios'
const baseUrl = '/api/login'


// gets login credentials and retrieves the password hash for the username
const login = async creds => {
  const res = await axios.post(baseUrl, creds)
  return res.data
}

export default { login }