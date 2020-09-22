import axios from 'axios'

const token =  process.env.REACT_APP_MY_API_KEY
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const baseUrl = proxyUrl + 'https://trefle.io/api/v1/'

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

const query =  {
  'filter_not': {
    'edible_part': 'null'
  }
}

export const getPlantsEdible = (pageNum) => {
  console.log(`${baseUrl}/plants?${query}&page=${pageNum}`)
  // return axios.get(`${baseUrl}/plants?${query}&page=${pageNum}`, config)
  return axios.get(`${baseUrl}/species?filter[edible]=true&page=${pageNum}`, config)
  // return axios.get(`${baseUrl}/plants?${query}`, config)
}

export const getPlantsEdibleQueryTwo = (queryText) => {
  console.log(queryText)
  console.log(`${baseUrl}/plants/?&filter[common_name]=${queryText}`)
  // return axios.get(`${baseUrl}/plants/search?q=${queryText}`, config)
  return axios.get(`${baseUrl}/species/search?q=${queryText}&filter[edible]=true`, config)
}

export const getSinglePlant = slug => axios.get(`${baseUrl}/plants/${slug}`, config)