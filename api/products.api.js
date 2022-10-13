const {promises:fs} = require ('fs');
const data_products = ("./model/products.json"); 


class Products {
    // static lastProductId = products[products.length - 1].id;
    
    constructor() {
      this.list = data_products;
    }

    produList = async () => {
        const produ = await fs.readFile(this.list, 'utf-8');
        const jsonProds = await JSON.parse(produ)
        return jsonProds
    };

  
    getAll = async (req,res) => { 
        const catalogy = await this.produList()
        return res.send(catalogy);
    }
  
    getById = async (req, res) => {
        const data = await this.produList();
        const {id} = req.params;
        const filter_prod = data.products.find(p => p.id === +id)
        if (!filter_prod) {
            return res.status(404).json({ state: false, error: `Produccto no id: ${id} no encontrado`});
          } 
        return res.send({ state: true, result: filter_prod });
    }
  
    save = async (req, res) => {
        data = await this.produList();
        const { name, description, code, price, image, stock } = req.body;
        if ( !name || !description || !code || !price || !image || !stock) {
            return res.status(404).json({ state: false, error: `the product doesn't have all the info`});
        }
      Products.lastProductId++;
      const newProduct = {
        id: Products.lastProductId,
        name,
        description,
        code,
        price,
        image,
        stock
      };

      console.log(newProduct);
      this.list.push(newProduct);
      return newProduct;
    };


    updateById = async (req, res) =>{
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
  
    deleteById = async (req, res) =>{
      const productIndex = this.list.findIndex((producto) => producto.id === +productId);
      if (productIndex < 0) return null;
      return this.list.splice(productIndex, 1);
    }
  }
  
  module.exports = Products;