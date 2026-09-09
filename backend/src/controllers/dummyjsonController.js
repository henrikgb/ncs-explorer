const dummyjsonService = require('../services/dummyjsonServices');
const { productDtoToDomain, getProducts, getProductById, getUsers, userDtoToDomain } = dummyjsonService;

async function listProducts(req, res, next) {
  try {
    const rawProducts = await getProducts();
    res.status(200).json(rawProducts.map((raw) => productDtoToDomain(raw)));
  } catch (err) { next(err); }
}

async function getProduct(req, res, next) {
  try {
    const rawProduct = await getProductById(req.params.id);
    res.status(200).json(productDtoToDomain(rawProduct));
  } catch (err) { next(err); }
}

async function listUsers(req, res, next) {
  try {
    const rawUsers = await getUsers();
    res.status(200).json(rawUsers.map((raw) => userDtoToDomain(raw)));
  } catch (err) { next(err); }
}

module.exports = { listProducts, getProduct, listUsers };