const express = require('express');
const { connect } = require('./router/app.routers');
const app = express();
const PORT = process.env.PORT || 8080
const apiRouetes = require('./router/app.routers')



//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/api',apiRouetes)


const connectedServer = app.listen(PORT, ()=>{
    console.log("Ready an running on port", PORT)
})

connectedServer.on('error',(error)=>{
    console.error('Error',error);
})