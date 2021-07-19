const express=require('express')
const router =express.Router()
const usermodel=require('../models/usermodel')



router.get('/',async(req,res)=>{
try{
const users=await usermodel.find()
res.json(users)
}catch(err){
    res.json({message:err.message})
}

})

router.get('/:id',async(req,res)=>{
    try{
    const user=await usermodel.findById(req.params.id)
   
    res.json(user.username)
    }catch(err){
        res.json({message:err.message})
    }
    
    })


module.exports=router