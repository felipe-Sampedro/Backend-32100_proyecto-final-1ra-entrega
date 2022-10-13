const carrito =[
    {
        id:1,
        timeStamp:"12/10/2022 16:24 p.m",
        productos:[{
            id:1,
            timeStamp:"12/10/2022 16:28 p.m",
            name: "camiseta",
            description:"100% algodon",
            codigo: 0101134,
            thumbnail:"https://www.texor.co/wp-content/uploads/2019/11/T-SHIRT-BLANCA.jpg",
            price: 45000,
            stock:12
        },
        {
            id:2,
            timeStamp:"12/10/2022 16:34 p.m",
            name: "gorra",
            description:"color rojo",
            codigo: 0901416,
            thumbnail:"https://static4.depositphotos.com/1000261/339/i/450/depositphotos_3394871-stock-photo-red-baseball-cap.jpg",
            price: 12000,
            stock:8
        },
        ] 
    },
    {
        id:2,
        timeStamp:"12/10/2022 17:58 p.m",
        productos:[{
           id:1,
           timeStamp:"12/10/2022 18:02 p.m",
           name: "pantaloneta",
           description:"100% algodon",
           codigo: 0201121,
           thumbnail:"https://http2.mlstatic.com/D_NQ_NP_874926-MCO45776109579_042021-W.jpg",
           price: 60000,
           stock:6
        },
        {
           id:2,
           timeStamp:"12/10/2022 18:14 p.m",
           name: "medias",
           description:"linea deportiva",
           codigo: 0101134,
           thumbnail:"https://assets.adidas.com/images/w_600,f_auto,q_auto/00bf8199e559467f8731ada1002bf0e5_9366/Medias_Deportivas_Malla_Estampadas_Largo_a_Media_Pantorrilla_Blanco_HA0110_03_standard.jpg",
           price: 12000,
           stock:22
        },
        ] 
    },
]

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
