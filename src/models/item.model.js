const mongoose=require("mongoose");
const itemSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    itemName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    calories:{
        type:Number,
        required:true
    },
    protein:{
        type:Number,
        required:true
    },
    fiber:{
        type:Number,
        required:true
    },
    fat:{
        type:Number,
        required:true
    },
    carbs:{
        type:Number,
        required:true
    },
    date:Date
})

module.exports=mongoose.model("Item",itemSchema);