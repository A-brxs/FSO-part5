import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const like = async (id,blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put( `${baseUrl}/${id}`, blogObject, config )
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete( `${baseUrl}/${id}`, config )
  return response.data
}

export default { getAll, create, like, setToken, deleteBlog }
