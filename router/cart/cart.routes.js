const express=require('express');
const carts = require('../../controller/cart.controller');
const router = express.Router();


//Routes

router.get('/',carts.getAllCart);

router.get('/:id',carts.getByIdCart);

router.post('/',carts.saveCart);

router.post('/:id_cart/:id_prod',carts.saveCartProd);

router.delete('/:id',carts.deleteByIdCart);

router.delete('/:id_cart/:id_prod',carts.deleteByIdCart_Prods);


module.exports = router;