const mongoose=require('mongoose')
const mcqmodel=require('../models/mcqmodel')
const userschema=new mongoose.Schema({
    username:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
        reqired:true
    },
    password:{
            type:String,
            required:true
    },
   
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    
})

module.exports=mongoose.model('User',userschema)