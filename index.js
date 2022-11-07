const express = require('express');
const { connect } = require('./router/app.routes');
const app = express();
const PORT = process.env.PORT || 8080
const apiRouetes = require('./router/app.routes')

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/api',apiRouetes)
app.use('*', (req, res)=>{
    res.status(404).send({error:-2, descripcion:`ruta ${req.baseUrl} metodo ${req.method} no implementada`})
});

const connectedServer = app.listen(PORT, ()=>{
    console.log("Ready an running on port", PORT)
})

connectedServer.on('error',(error)=>{
    console.error('Error',error);
})