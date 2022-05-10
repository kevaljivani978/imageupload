const express = require("express");
const mongoose = require("mongoose");
const app = express();

const productRouter = require('./routes/product.routes')

mongoose.connect("mongodb://localhost:27017/demofileupload").then(()=>{
    console.log("databse is connect sussfully ");
}).catch(()=>{
    console.log("database is not connected");
})
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/',productRouter)

app.listen(6000, () => {
  console.log("port listen in 6000 nunber");
});
