const mongoose=require('mongoose');

const employData=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true
    },
    remark:{
        type:String,
        required:true
    }

})

//we need to  collection
const SignUp=new mongoose.model("Signupdata",employData);

module.exports=SignUp;