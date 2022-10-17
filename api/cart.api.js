const { promises: fs } = require('fs');
const cart_list = ("./model/cart.json");
const data_products = ("./model/products.json"); 

class Container {
    static lastCartId = cart_list[cart_list.length - 1].id;
    
    constructor() {
      this.list = cart_list;
    }
  
    cartList = async () =>{
      const data_C = await fs.readFile(this.list,"utf-8");
      const cartData = await JSON.parse(data_C);
      return cartData
    }

    getAllCart = async (req, res) => {
      const dataListC= await this.cartList()
      return res.send(dataListC);
    }

  
    getByIdCart= async (req,res) => {
      const data_C = await this.cartList()
      const {id} = req.params
      console.log(id);
      const filter_cart = data_C.cart.find(c => c.id === +id)
      if (!filter_cart){
        return res.status(404).send({state:"error", error:`the cart with id: ${id} doesn't exist!`})
      }
      return res.send({state:"Succses",filter_cart});
    }
  
    saveCart= async (req,res) => {
      const data_C = await this.cartList()
      const {productos} = req.body
      console.log(productos);
      if ( !productos) {
        return res.status(404).send({state:"error", error:"there are not products on the cart!!!"});
      }
      Container.lastCartId++;
      const newProduct = {
        id: data_C.cart.length + 1,
        timeStamp: Date.now(),
        productos:[]
      };
      data_C.cart.push(newProduct);
      const dataCToString = JSON.stringify(data_C,null,2) 
      await fs.writeFile(this.list,dataCToString,"utf-8")
      
      return res.send({state:"Succes",result: newProduct});
    };


    saveCartProd= async (req,res) => {
      const data_C = await this.cartList()

      const data_Cart= data_C.cart

      const data_P = await fs.readFile(data_products,"utf-8");
      const prodData = await JSON.parse(data_P);

      const {id_cart,id_prod} = req.params

      const cartIndex = data_C.cart.findIndex(ci=>ci.id === +id_cart)
      const prodIndex = +prodData.products.findIndex(p=>p.id === +id_prod)

      if ( cartIndex < 0) {
        return res.status(404).send({ state: "error", error: `Cart with id: ${id_cart} doesn't exist`});
      }
      if (prodIndex < 0) {
        return res.status(404).send({ state: "error", error: `Product with id: ${id_prod} doesn't exist`});
      }

      data_Cart[cartIndex].productos.push(prodData.products[prodIndex])
      const dataCToString = JSON.stringify(data_C,null,2) 
      await fs.writeFile(this.list,dataCToString,"utf-8")
      
      return res.send({state:"Succes",result: data_Cart});
    };
  
    deleteByIdCart = async (req,res)=> {
      const {id} = req.params 
      const data_C = await this.cartList();
      const carttIndex = data_C.cart.findIndex((cart) => cart.id === +id);
      if (carttIndex < 0) {
        return res.status(404).send({ state: "error", error: `Cart with id: ${id} doesn't exist`});
      }

      data_C.cart.splice(carttIndex,1)
      const dataToStringC = JSON.stringify(data_C,null,2)
      const datan = await fs.writeFile(this.list,dataToStringC,'utf-8')

      return res.send({state:"success", resul:"the cart has been deleted"})
    }


    deleteByIdCart_Prods = async (req,res)=> {
      const data_C = await this.cartList();
      const {id_cart,id_prod} = req.params 
      const cartIndex = data_C.cart.findIndex(ci=>ci.id === +id_cart)
      // const prodIndex = +prodData.products.findIndex(p=>p.id === +id_prod)
      if (cartIndex < 0) {
        return res.status(404).send({ state: "error", error: `Cart with id: ${id} doesn't exist`});
      }
      const prodIndex = data_C.cart[cartIndex].productos.findIndex(p=>p.id===+id_prod)
      
      if (prodIndex < 0) {
        return res.status(404).send({ state: "error", error: `Product with id: ${id_prod} in cart with id: ${id_cart} doesn't exist`});
      }


      console.log(data_C.cart[2]);
      console.log(prodIndex);
      
      data_C.cart[cartIndex].productos.splice([prodIndex],1)
      
      // const carttIndex = data_C.cart.findIndex((cart) => cart.id === +id);

      // data_C.cart.splice(carttIndex,1)
      // const dataToStringC = JSON.stringify(data_C,null,2)
      // const datan = await fs.writeFile(this.list,dataToStringC,'utf-8')

      return res.send({state:"success", resul:`the Item with id: ${id_prod} of the cart with id: ${id_cart} has been deleted`})
    }

  }
  
  module.exports = Container;