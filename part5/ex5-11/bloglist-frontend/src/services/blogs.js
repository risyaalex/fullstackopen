import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  console.log('Token:', token)

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, update, deleteBlog }
