import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyapi.io/data/v1/',
  headers: {
    'Content-Type': 'application/json',
    'app-id': '64b53aacc898809268d2af5a'
  }
})

export default api;
