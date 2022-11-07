const Contenedor = require('../model2/products')
const products = new Contenedor('../data/products.json')



getAll = async (req,res) => { 
    const catalogy = products.getAll()
    return res.send(catalogy);
}

getById = async (req, res) => {
    const {id} = req.params;
    const pro = products.getById(id)
    const filter_prod = pro.products.find(p => p.id === +id)
    if (!filter_prod) {
        return res.status(404).json({ state: "error", error: `Product with id: ${id} doesn't found`});
        } 
    return res.send({ state: "success", result: filter_prod });
}

save = async (req, res) => {
    const { name, description, code, price, image, stock } = req.body;
    if ( !name || !description || !code || !price || !image || !stock) {
        return res.status(404).json({ state: "error", error: `the product doesn't have all the info`});
    }
    Products.lastProductId++;

    data.products.push(newProduct);
    return res.send({ state: "success", result: newProduct });
};


updateById = async (req, res) =>{
    const {id}= req.params
    const { name, description, code, price, image, stock } = req.body;
    
    if ( !name || !description || !code || !price || !image || !stock) {
        return res.status(404).json({ state: "error", error: `the product doesn't have all the info`});
    }  

    const product = products.getById(id);
    if (!product) {
        return res.status(404).json({ state: "error", error: `the product wasn't found`});            
    };

    const updatedProduct = products.getById(id)
    return res.send({ state: "success", result: updatedProduct });
}

deleteById = async (req, res) =>{
    const {id}= req.params    
    const productIndex = data.products.findIndex((prod) => prod.id === +id);
    if (productIndex < 0) {
        return res.status(404).json({ state: "error", error: `the product wasn't found`});            
    };
    console.log(productIndex);
    data.products.splice(productIndex, 1);
    const dataToString = JSON.stringify(data, null, 2);
    const datan = await fs.writeFile(this.list,dataToString,'utf-8');
    return res.send({ state: "success", result: "the product has been deleted"});
}
  
  
  module.exports = Products;