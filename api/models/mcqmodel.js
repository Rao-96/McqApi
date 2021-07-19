const mongoose=require('mongoose')
const User =require('./usermodel')
const mcqschema=new mongoose.Schema({
   Question:{
        type:String,
        reqired:true
    },
    Subject:{
            type:String,
            required:true
    },
    Choices:{
        type:[String],
        required:true
    },
    user:
        
{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}
        
})

module.exports=mongoose.model('Mcq',mcqschema)