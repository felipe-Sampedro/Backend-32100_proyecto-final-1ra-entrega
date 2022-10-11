const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080




app.listen(PORT, ()=>console.log("Ready an running on port", PORT))