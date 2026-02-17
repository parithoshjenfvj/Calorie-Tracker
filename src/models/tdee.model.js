const mongoose=require("mongoose");
const tdeeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    age:{
        type:Number,
        required:[true,"age is required"]
    },
    weight:{
        type:Number,
        required:[true,"weight is required"]
    },
    activity:{
        type:String,
        enum:["lightExercise", "moderateExercise", "heavyExercise"],
        required:true
    },
    calculatedTdee:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("tdee",tdeeSchema);