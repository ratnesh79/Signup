const dotenv=require("dotenv"); 
 
const express=require("express");
const nodemailer = require("nodemailer");
const mongoose=require("mongoose");
const app=express();
const path=require('path');
require('./db/conn');
dotenv.config({ path: path.resolve(__dirname, "./config.env") })


const SignUp=require("./models/schema")
const port =process.env.PORT || 2000;
const path_public=path.join(__dirname,"../public");
dotenv.config({path:'./config.env'})
 
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(path_public))
app.get("/",(req,res)=>{
 res.render('index');
})

app.post("/register",async (req,res)=>{
     try {
       const data=new SignUp({
        Name:req.body.Name,
        email:req.body.email,
        company:req.body.company,
        contact:req.body.contact,
        city:req.body.city,
        country:req.body.country,
        product:req.body.product,
        remark:req.body.remark
       })
       
    const registered=  await data.save();
      res.status(201).send("submit form successfully");
     } catch (error) {
        res.status(400).send(error);
     }

     let transporter =nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.EMAIL, // user name
          pass: process.env.PASS, //  password
        },
      });

     transporter.sendMail({
        from:"myselfratnesh1@gmail.com", // sender address
        to:req.body.email  , // list of receivers
        subject: "Submitted", // Subject line
        text: `Hello ${req.body.Name} `, // plain text body
        html: `<b>Hello ${req.body.Name} , Your form successfully submitted</b>`, // html body
      },(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log("mail has been send");
        }
      });
    
  
})

app.listen(port,()=>{
    console.log(`server is running at port : ${port}`);
})