import axios from "./axios";

export function getProducts(params) {
  return axios.get('/products/all', { params })
}

export function editProduct(params) {

}

export function addProduct(params) {
  return axios.post('/products/add', params);
}

export function deleteProduct(id) {
  return axios.delete(`/products/${id}`);
}