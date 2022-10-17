const express=require('express');
const Container = require('../../api/cart.api');

const router = express.Router();

const container = new Container

//Routes

router.get('/',container.getAllCart);

router.get('/:id',container.getByIdCart);

router.post('/',container.saveCart);

router.post('/:id_cart/:id_prod',container.saveCartProd);

router.delete('/:id',container.deleteByIdCart);

router.delete('/:id_cart/:id_prod',container.deleteByIdCart_Prods);


module.exports = router;