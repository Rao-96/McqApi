const mcqmodel=require('../models/mcqmodel')
exports.questions = 
    async(req,res)=>{
        try{
        const mcqs=await mcqmodel.find()
        // mcq_question=mcqs.map((obj)=>([obj.Question,obj.Choices,obj.user]))\
        
        res.json(mcqs)
        }catch(err){
            res.json({message:err.message})
        }
        
        
    res.status(200).send("Public Content.");
  };
  
  exports.createmcq = async(req,res)=>{
    const mcq=new mcqmodel({
        Question:req.body.Question,
        Subject:req.body.Subject,
         Choices:req.body.Choices,
         user:req.body.user       
    })
    try{
        const newmcq =await mcq.save()
        res.status(201).json(newmcq)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
 };
  
  exports.usermcqs = async(req, res) => {
  await mcqmodel.find(
       {
           user:{$in:req.params.id}
       }
   ).exec((err,mcqs)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.json(mcqs)
   })
  };
  exports.updatemcq=async(req,res)=>{
  
      
          
          
            const mcq = await mcqmodel.findById(req.params.id).exec();
            if (!mcq) return res.status(404).send('The mcq with the given ID was not found.');
          
            let query = {$set: {}};
            for (let key in req.body) {
              if (mcq[key] && mcq[key] !== req.body[key]) // if the field we have in req.body exists, we're gonna update it
                 query.$set[key] = req.body[key];
            }
            const updatedMcq = await mcqmodel.updateOne({_id: req.params.id}, query).exec();
          
            res.send(updatedMcq);
          
  
  }
  exports.deletemcq=async(req,res)=>{
      await mcqmodel.findByIdAndDelete(req.params.id).exec((err,mcq)=>{
          if(err){
              res.status(500).send({message:err})
          }
          res.status(200).send({message:'mcq is deleted'})
      })
  }