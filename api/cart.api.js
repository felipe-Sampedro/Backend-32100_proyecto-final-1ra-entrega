const {promises:fs} = require('fs')


class Contenedor {
    static lastProductId = carrito[carrito.length - 1].id;
    
    constructor() {
      this.list = carrito;
    }
  
    getAll() {
      return this.list;
    }
  
    getById(carritoId) {
      return this.list.find(carrito => carrito.id === +carritoId);
    }
  
    save(product) {
      const { timeStamp, productos} = product;
      if ( !nombre || !precio) {
        return null;
      }
      Products.lastProductId++;
      const newProduct = {
        id: Products.lastProductId,
        nombre,
        precio,
        imagen
      };
      console.log(newProduct);
      this.list.push(newProduct);
      return newProduct;
    };


    updateById(productId, product) {
      const productIndex = this.list.findIndex((producto) => producto.id === +productId);
      if (productIndex < 0) return null;
      const {
        nombre,
        precio,
        imagen
      } = product;
      const updatedProduct = {
        id: this.list[productIndex].id,
        nombre,
        precio,
        imagen
      };
      this.list[productIndex] = updatedProduct;
      return updatedProduct;
    }
  
    deleteById(productId) {
      const productIndex = this.list.findIndex((producto) => producto.id === +productId);
      if (productIndex < 0) return null;
      return this.list.splice(productIndex, 1);
    }
  }
  
  module.exports = Contenedor;