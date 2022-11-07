const express=require('express');
// const Products = require('../../api/products.api');
const products = require('../../controller/products.controller');
const router = express.Router();

// const products = new Products()

//Routes

router.get('/',products.getAll);

router.get('/:id',products.getById);

router.post('/',products.save);

router.put('/:id',products.updateById);

router.delete('/:id',products.deleteById);


module.exports = router;