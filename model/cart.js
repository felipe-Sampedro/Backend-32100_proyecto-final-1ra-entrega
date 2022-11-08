const {promises:fs} = require ('fs');
const data_cart = ('./data/cart.json'); 
const data_products = ('./data/products.json'); 

const Products = require('../model/products')
const products = new Products('../data/products.json')


class Contenedor {
    // static lastProductId = data.cart[data.cart.length-1].id;

    constructor() {
      this.list = data_cart;
    }

    cartList = async () => {
        const data_C = await fs.readFile(this.list, 'utf-8');
        const cartData = await JSON.parse(data_C)
        return cartData
    };

    getAllCart = async () => { 
        const dataListC = await this.cartList()
        return dataListC;
    }
  
    getByIdCart = async (id) => {
        const dataC = await this.cartList();
        return dataC.cart.find(c => c.id === +id);
    }
  
    saveCart = async (datos) => {
        const data = await this.cartList();
        const newid = data.cart[data.cart.length-1].id
        // const {productos} = datos
        const newCart = {
            id: newid + 1,
            timeStamp: Date.now(),
            productos:[]
          };
        data.cart.push(newCart);
        const dataToString = JSON.stringify(data, null, 2);
        const datan = await fs.writeFile(this.list, dataToString,'utf-8');
      return newCart.id;
    };


    saveCartProd= async (idCart,idProd) => {
        const data_C = await this.cartList()
        const data_P = await products.getById(idProd)
        const cartIndex = data_C.cart.findIndex((cart) => cart.id === +idCart)
        data_C.cart[cartIndex].productos.push(data_P)
        const dataCToString = JSON.stringify(data_C,null,2) 
        await fs.writeFile(this.list,dataCToString,"utf-8")
        return data_P
      };

      deleteByIdCart_Prods = async (idCart,idProd)=> {
        const data_C = await this.cartList();
        const cartIndex = data_C.cart.findIndex(ci=>ci.id === +idCart)
        console.log(cartIndex);
        const prodIndex = data_C.cart[cartIndex].productos.findIndex(pi=>pi.id === +idProd)
        data_C.cart[cartIndex].productos.splice([prodIndex],1)
        const dataToStringC = JSON.stringify(data_C,null,2)
        const datan = await fs.writeFile(this.list,dataToStringC,'utf-8')
        return prodIndex
      }

      deleteByIdCart = async (idCart)=> {
        const data_C = await this.cartList();
        const cartIndex = data_C.cart.findIndex((cart) => cart.id === +idCart);
        data_C.cart.splice(cartIndex,1)
        const dataToStringC = JSON.stringify(data_C,null,2)
        const datan = await fs.writeFile(this.list,dataToStringC,'utf-8')
        return cartIndex
      }
  
  }
  
  module.exports = Contenedor;