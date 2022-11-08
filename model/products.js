const {promises:fs} = require ('fs');
const data_products = ('./data/products.json'); 

class Products {
    // static lastProductId = data.products[data.products.length-1].id;

    constructor() {
      this.list = data_products;
    }

    produList = async () => {
        const produ = await fs.readFile(this.list, 'utf-8');
        const jsonProds = await JSON.parse(produ)
        return jsonProds
    };

    getAll = async () => { 
        const catalogy = await this.produList()
        return catalogy;
    }
  
    getById = async (id,datos) => {
        const data = await this.produList();
        return data.products.find(p => p.id === +id);
    }
  
    save = async (datos) => {
        const data = await this.produList();
        const newid = data.products[data.products.length-1].id
        const { name, description, code, price, image, stock } = datos;
        const newProduct = {
            id: newid + 1,
            timestamp:Date.now(),
            name,
            description,
            code,
            image,
            price,
            stock
        };
        data.products.push(newProduct);
        const dataToString = JSON.stringify(data, null, 2);
        const datan = await fs.writeFile(this.list, dataToString,'utf-8');
      return newProduct;
    };


    updateById = async (id, datos) =>{
        const data = await this.produList();
        const { name, description, code, price, image, stock } = datos;
        
        const productIndex = data.products.findIndex((prod) => prod.id === +id);

        const updatedProduct = {
            id: data.products[productIndex].id,
            timestamp:Date.now(),
            name,
            description,
            code,
            image,
            price,
            stock
        };
        data.products[productIndex] = updatedProduct;
        const dataToString = JSON.stringify(data, null, 2);
        const datan = await fs.writeFile(this.list,dataToString,'utf-8');
        return updatedProduct;
    }
  
    deleteById = async (id) =>{
        const data = await this.produList();
        const productIndex = data.products.findIndex((prod) => prod.id === +id);
        data.products.splice(productIndex, 1);
        const dataToString = JSON.stringify(data, null, 2);
        const datan = await fs.writeFile(this.list,dataToString,'utf-8');
        return { state: "success", result: "the product has been deleted"}
    }
  }
  
  module.exports = Products;