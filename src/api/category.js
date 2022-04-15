import axios from "./axios";

export function getCategory(params) {
  return axios.get('/category/all', { params })
}

export function editCategory(params) {
  return axios.put('/category/edit', params)
}

export function addCategory(params) {
  console.log(params);
  return axios.get('/category/add', { params })
}

export function deleteCategory(id) {
  return axios.delete(`/category/${id}`)
}