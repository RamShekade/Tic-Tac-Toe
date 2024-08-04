const express=require("express");
const router=express.Router();
const {Signup,Chat}= require("../server");


router.get("/:name/chat",async(req,res)=>{
    let msg=null;
    let name=req.params.name;
    let msgs= await Chat.find({});
    console.log(name);
    console.log(msgs);
    res.render("chat.ejs",{name,msg,msgs});
});

router.post("/:name/chat",async(req,res)=>{
    let msg=req.body.msg;
    let name=req.params.name;
    console.log(msg , name);
    const chat=new Chat({name,msg});
    await chat.save();
    res.render("chat.ejs");
});

module.exports = router;

