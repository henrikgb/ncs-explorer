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

function productDtoToDomain(raw) {
  return {
    id: raw.id,
    name: raw.title,
    price: raw.price,
    category: raw.category,
    imageUrl: raw.thumbnail,
    inStock: raw.stock > 0
  }
}

async function getProducts() {
  const data = await request('/products');
  return data.products;
}

async function getProductById(id) {
  return request(`/products/${id}`);
}

function userDtoToDomain(raw) {
  return {
    id: raw.id,
    name: `${raw.firstName} ${raw.lastName}`,
    email: raw.email,
    avatarUrl: raw.image
  }
}

async function getUsers() {
  const data = await request('/users');
  return data.users;
}

module.exports = { productDtoToDomain, getProducts, getProductById, getUsers, userDtoToDomain };