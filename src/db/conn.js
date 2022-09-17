const dotenv=require('dotenv'); 
const mongoose=require("mongoose");
const path=require('path');
dotenv.config({ path: path.resolve(__dirname, "../config.env") })
 
 const DB=process.env.BASE;
mongoose.connect(DB).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err);
})