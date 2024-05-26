let express = require("express");
let app = express();
let mongoose = require('mongoose')

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/guiapics",{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('conectado');
}).catch(err=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.json({});
});

module.exports = app;