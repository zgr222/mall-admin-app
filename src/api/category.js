import axios from "./axios";

export function getCategory(params) {
  return axios.get('/category/all', { params })
}