const express=require('express');
const Contenedor = require('../../api/cart.api');
const cart = require('../../model/carrito')

const router = express.Router();

const contenedor = new Contenedor


//Routes

router.get('/:id',contenedor.getByIdCart);

router.post('/',contenedor.saveCart);

router.delete('/:id',contenedor.deleteByIdCart);


router.post('/:id/productos/:id_prod',);

router.delete('/:id/productos/:id_prod',);



module.exports = router;