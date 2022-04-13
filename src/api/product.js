import axios from "./axios";

export function getProducts(params) {
  return axios.get('/products/all', { params })
}