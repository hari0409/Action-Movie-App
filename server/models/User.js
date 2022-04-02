const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    movieWatchlist:{
        type:Array,
        default:[]
    },
    seriesWatchList:{
        type:Array,
        default:[]
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})
module.exports=mongoose.model("User",UserSchema);