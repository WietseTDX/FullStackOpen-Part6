import axios from 'axios'

const baseUrl = 'http://localhost:3000/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const updateRecord = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export { getAll, createNew, updateRecord }
