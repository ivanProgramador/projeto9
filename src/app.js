let express = require("express");
let app = express();
let mongoose = require('mongoose');
let user = require('./models/User');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/guiapics",{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
   // console.log('conectado');
}).catch((err)=>{
    console.log(err);
   
});

let User = mongoose.model("User",user);




app.get("/",(req,res)=>{
    res.json({});
});

app.post("/user", async (req,res)=>{

    if(req.body.name=="" || req.body.email =="" || req.body.password ==""){
        res.sendStatus(400);
        return;
    }

    //checando se o email esta repetido
    
    try {

        let user = await User.findOne({"email": req.body.email});

        if(user != undefined){
            res.statusCode = 400;
            res.json({error:"E-mail já cadastrado"});
            return;
        }


      

        
      }catch (error) {
        res.sendStatus(500)
        
    }

    try {

        let newUser = new User({name:req.body.name,email: req.body.email,password: req.body.password});
        newUser.save();
        res.json({email: req.body.email});
        
    } catch (err) {

        res.sendStatus(500);
        
    }


  


});




module.exports = app;