let express = require("express");
let app = express();
let mongoose = require('mongoose');
let user = require('./models/User');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/guiapics",{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log('conectado');
}).catch(err=>{
   
});

let User = mongoose.model("User",user);




app.get("/",(req,res)=>{
    res.json({});
});

app.post("/user",(req,res)=>{
   let newUser = new User(
    {
        name:req.body.name,
        email:req.body.email,
        password: req.body.password
    });

    newUser.save();


});




module.exports = app;