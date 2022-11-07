// const {promises:fs} = require ('fs');
// const data_products = ("./model/products.json"); 

// class Products {
//     static lastProductId = data_products[data_products.length - 1].id;
    
//     constructor() {
//       this.list = data_products;
//     }

//     produList = async () => {
//         const produ = await fs.readFile(this.list, 'utf-8');
//         const jsonProds = await JSON.parse(produ)
//         return jsonProds
//     };

//     getAll = async (req,res) => { 
//         const catalogy = await this.produList()
//         return res.send(catalogy);
//     }
  
//     getById = async (req, res) => {
//         const data = await this.produList();
//         const {id} = req.params;
//         const filter_prod = data.products.find(p => p.id === +id)
//         if (!filter_prod) {
//             return res.status(404).json({ state: "error", error: `Product with id: ${id} doesn't found`});
//           } 
//         return res.send({ state: "success", result: filter_prod });
//     }
  
//     save = async (req, res) => {
//         const data = await this.produList();
//         const { name, description, code, price, image, stock } = req.body;
//         if ( !name || !description || !code || !price || !image || !stock) {
//             console.log(req.body);
//             return res.status(404).json({ state: "error", error: `the product doesn't have all the info`});
//         }
//         Products.lastProductId++;
//         const newProduct = {
//             id: lastProductId++,
//             timestamp:Date.now(),
//             name,
//             description,
//             code,
//             image,
//             price,
//             stock
//         };
//         console.log(newProduct);
//         data.products.push(newProduct);
//         const dataToString = JSON.stringify(data, null, 2);
//         const datan = await fs.writeFile(this.list, dataToString,'utf-8');

//       return res.send({ state: "success", result: newProduct });
//     };


//     updateById = async (req, res) =>{
//         const data = await this.produList();
//         const {id}= req.params
//         const { name, description, code, price, image, stock } = req.body;
        
//         if ( !name || !description || !code || !price || !image || !stock) {
//             return res.status(404).json({ state: "error", error: `the product doesn't have all the info`});
//         }  
//         const productIndex = data.products.findIndex((prod) => prod.id === +id);
//         if (productIndex < 0) {
//             return res.status(404).json({ state: "error", error: `the product wasn't found`});            
//         };
//         const updatedProduct = {
//             id: data.products[productIndex].id,
//             timestamp:Date.now(),
//             name,
//             description,
//             code,
//             image,
//             price,
//             stock
//         };
//         data.products[productIndex] = updatedProduct;
//         const dataToString = JSON.stringify(data, null, 2);
//         const datan = await fs.writeFile(this.list,dataToString,'utf-8');
//         return res.send({ state: "success", result: updatedProduct });
//     }
  
//     deleteById = async (req, res) =>{
//         const data = await this.produList();
//         const {id}= req.params    
//         const productIndex = data.products.findIndex((prod) => prod.id === +id);
//         if (productIndex < 0) {
//             return res.status(404).json({ state: "error", error: `the product wasn't found`});            
//         };
//         console.log(productIndex);
//         data.products.splice(productIndex, 1);
//         const dataToString = JSON.stringify(data, null, 2);
//         const datan = await fs.writeFile(this.list,dataToString,'utf-8');
//         return res.send({ state: "success", result: "the product has been deleted"});
//     }
//   }
  
//   module.exports = Products;