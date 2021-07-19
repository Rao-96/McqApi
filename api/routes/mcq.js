// const express=require('express')
// const router =express.Router()
const mcqmodel=require('../models/mcqmodel')
const User = require("../models/usermodel");
// const { verifyToken,isAdmin } = require("../middleware/authjwt");
// router.get('/question',async(req,res)=>{
// try{
// const mcqs=await mcqmodel.find()
// // mcq_question=mcqs.map((obj)=>([obj.Question,obj.Choices,obj.user]))\

// res.json(mcqs)
// }catch(err){
//     res.json({message:err.message})
// }

// })
// router.get('/answer',async(req,res)=>{
//     try{
//     const mcqs=await mcqmodel.find()
//     res.json(mcqs.)
//     }catch(err){
//         res.json({message:err.message})
//     }
    
//     })
// router.post('/',verifyToken,async(req,res)=>{
//    const mcq=new mcqmodel({
//        Question:req.body.Question,
//        Subject:req.body.Subject,
//         Choices:req.body.Choices,
//         user:req.body.user       
//    })
//    try{
//        const newmcq =await mcq.save()
//        res.status(201).json(newmcq)
//    }
//    catch(err){
//        res.status(400).json({message:err.message})
//    }
// })

// router.put('/:id',(req,res)=>{
    
// })
// router.delete('/:id',(req,res)=>{
    
// })

// module.exports=router
const { verifyToken } = require("../middleware/authjwt");
const controller = require("../controllers/mcq.controller");

const express=require('express')
const router =express.Router()

  router.get("/all", controller.questions);

  router.post("/createmcq", [verifyToken], controller.createmcq);

  router.get("/byuser/:id", [verifyToken],controller.usermcqs);
router.put("/update/:id",[verifyToken],controller.updatemcq);
router.delete("/delete/:id",[verifyToken],controller.deletemcq);
  module.exports=router