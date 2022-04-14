import axios from "./axios";

// 获取所有商品
export function getProducts(params) {
  return axios.get('/products/all', { params })
}

// 根据id获取单个商品
export function getProductById(id) {
  return axios.get(`/products/${id}`);
}

// 修改商品
export function editProduct(params) {
  return axios.put('/products/edit', params);
}

// 添加商品
export function addProduct(params) {
  return axios.post('/products/add', params);
}

// 删除商品
export function deleteProduct(id) {
  return axios.delete(`/products/${id}`);
}