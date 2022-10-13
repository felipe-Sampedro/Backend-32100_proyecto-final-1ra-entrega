const express=require('express');
const Products = require('../../api/products.api');

const router = express.Router();


const products = new Products()

//Routes

router.get('/',products.getAll);

router.get('/:id',products.getById);

router.post('/',(req,res) =>{

});

router.put('/:id',(req,res) =>{

});

router.delete('/:id',(req,res) =>{

});


module.exports = router;