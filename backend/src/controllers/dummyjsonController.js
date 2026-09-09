 const dummyjsonService = require('../services/dummyjsonServices');

 async function listProducts(req, res, next) {
   try {
     res.status(200).json(await dummyjsonService.getProducts());
   } catch (err) { next(err); }
 }

 async function getProduct(req, res, next) {
   try {
     res.status(200).json(await dummyjsonService.getProductById(req.params.id));
   } catch (err) { next(err); }
 }

 async function listUsers(req, res, next) {
   try {
     res.status(200).json(await dummyjsonService.getUsers());
   } catch (err) { next(err); }
 }

 module.exports = { listProducts, getProduct, listUsers };