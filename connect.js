const express = require("express");
const app=express();
const bodyparser=require("body-parser");
const path=require("path");
const {Signup,Chat}= require("./server");
const mongoose = require('mongoose');
const { Sign } = require("crypto");
const chat=require("./routes/chats.js");


const port=3000;
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyparser.json()); 

app.use(bodyparser.urlencoded({extended:true}));

app.listen(port,()=>{
    console.log(`App is listning at port ${port}`);
});

 
app.get("/",(req,res)=>{
        res.render("index.ejs",{name:null});
});

app.post("/login", async(req, res) => {
    const email = req.body.email;
    const password=req.body.password; 
    try{ 
    let user= await Signup.findOne({email});
    if(user.password==password){ 
    console.log(user);
    let name=user.name;
    res.render("index.ejs",{name});
  }
  else{
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Node"');
    res.end('Unauthorized');
  }
  }
    catch{
      res.redirect("/");
    }
  });
app.use("/login",chat);
app.post("/signup",async(req,res)=>{
    console.log(req.body);
    const users=req.body;
    const user=new Signup(users);
    
  try {
    // Save the new user to the database
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user");
  }
});