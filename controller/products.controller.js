const Products = require('../model/products')
const products = new Products('../data/products.json')

getAll = async (req,res) => { 
    const catalogy = await products.getAll()
    return res.send(catalogy);
}


getById = async (req, res) => {
    const {id} = req.params;
    const filter_prod = await products.getById(id)
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
    const datas = await products.getAll()
    datas.products.push(newProduct);
    return res.send({ state: "success", result: newProduct });
};


updateById = async (req, res) =>{
    const {id}= req.params
    const { name, description, code, price, image, stock } = req.body;
    
    if ( !name || !description || !code || !price || !image || !stock) {
        return res.status(404).json({ state: "error", error: `the product doesn't have all the info`});
    }  

    const product = await products.getById(id);
    if (!product) {
        return res.status(404).json({ state: "error", error: `the product wasn't found`});            
    };

    const updatedProduct = products.getById(id)
    return res.send({ state: "success", result: updatedProduct });
}


deleteById = async (req, res) =>{
    const {id}= req.params    
    const datad = await products.getAll()
    const productIndex = datad.products.findIndex((prod) => prod.id === +id);
    if (productIndex < 0) {
        return res.status(404).json({ state: "error", error: `the product wasn't found`});            
    };
    console.log(productIndex);
    datad.products.splice(productIndex, 1);
    return res.send({ state: "success", result: "the product has been deleted"});
}
  
  
  module.exports = {
    getAll,
    getById,
    save,
    updateById,
    deleteById
};