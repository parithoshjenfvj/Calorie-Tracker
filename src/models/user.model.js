const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("user",userSchema)