const Contenedor = require('../model/cart')
const carrito = new Contenedor('../data/cart.json')

const Products = require('../model/products')
const products = new Products('../data/products.json')

// const cart_list = ("./model/cart.json");
// const data_products = ("./model/products.json"); 


getAllCart = async (req, res) => {
    const dataListC= await carrito.getAllCart()
    return res.send(dataListC);
}


getByIdCart= async (req,res) => {
    const {id} = req.params
    const filter_cart = await carrito.getByIdCart(id)
    if (!filter_cart){
    return res.status(404).send({state:"error", error:`the cart with id: ${id} doesn't exist!`})
    }
    return res.send({state:"Succses",filter_cart});
}

saveCart= async (req,res) => {
    const {productos} = req.body
    const newCart = await carrito.saveCart(productos)
    return res.send({state:"Succes",result: 'the id of de new cart is:' + newCart});
};


saveCartProd= async (req,res) => {
    const {id_cart,id_prod} = req.params
    const dataC = await carrito.getAllCart()
    const dataP = await products.getAll()
    const cartIndex = dataC.cart.findIndex((cart) => cart.id === +id_cart)
    const prodIndex = dataP.products.findIndex((prod) => prod.id === +id_prod)
    if ( cartIndex < 0) {
        return res.status(404).send({ state: "error", error: `Cart with id: ${id_cart} doesn't exist`});
    }
    if (prodIndex < 0) {
        return res.status(404).send({ state: "error", error: `Product with id: ${id_prod} doesn't exist`});
    }
    const data_Cart = carrito.saveCartProd(id_cart,id_prod) 
    return res.send({state:"Succes",result: data_Cart});
};


deleteByIdCart_Prods = async (req,res)=> {
    const {id_cart,id_prod} = req.params 
    const dataC = await carrito.getAllCart()
    const cartIndex = dataC.cart.findIndex((cart) => cart.id === +id_cart)
    const prodIndex = dataC.cart[cartIndex].productos.findIndex((prod) => prod.id === +id_prod)

    if (cartIndex < 0) {
    return res.status(404).send({ state: "error", error: `Cart with id: ${id_cart} doesn't exist`});
    }
    if (prodIndex < 0) {
    return res.status(404).send({ state: "error", error: `Product with id: ${id_prod} in cart with id: ${id_cart} doesn't exist`});
    }
    const data_C = carrito.deleteByIdCart_Prods(id_cart,id_prod) 
    return res.send({state:"success", resul:`the Item with id: ${id_prod} of the cart with id: ${id_cart} has been deleted`})
}


deleteByIdCart = async (req,res)=> {
    const {id} = req.params 
    const dataC = await carrito.getAllCart()
    const carttIndex = dataC.cart.findIndex((cart) => cart.id === +id)
    if (carttIndex < 0) {
    return res.status(404).send({ state: "error", error: `Cart with id: ${id} doesn't exist`});
    }
    const data_C = carrito.deleteByIdCart(id)
    return res.send({state:"success", resul:`the cart with id: ${id} has been deleted`})
}
  
module.exports = {
    getAllCart,
    getByIdCart,
    saveCart,
    saveCartProd,
    deleteByIdCart_Prods,
    deleteByIdCart
};