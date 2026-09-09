const config = require('../config');

 async function request(path) {
   const res = await fetch(`${config.dummyJson.baseUrl}${path}`);
   if (!res.ok) {
     const err = new Error(`DummyJSON request failed: ${res.status} ${res.statusText}`);
     // We set the status property on the error object to distinguish between client and server errors.
     // Client errors (4xx) retain their original status, while server errors default to 502 (Bad Gateway).
     err.status = res.status >= 400 && res.status < 500 ? res.status : 502;
     throw err;
   }
   return res.json();
 }

 async function getProducts() {
   return request('/products');
 }

 async function getProductById(id) {
   return request(`/products/${id}`);
 }

 async function getUsers() {
   return request('/users');
 }

 module.exports = { getProducts, getProductById, getUsers };