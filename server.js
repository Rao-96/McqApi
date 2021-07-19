require('dotenv').config();
const express=require('express');
const cors = require("cors");
const role=require('./api/models/rolemodel');
const app=express();

var corsOptions = {
    origin: "http://localhost:5000"
  };
  
  app.use(cors(corsOptions));


const  mongoose  = require('mongoose');
const  env  = require('process');
const port=process.env.PORT;

app.listen(port,()=>console.log("server running to "+port));
//database
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true});
const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))
db.once('save',()=>{new role({
    name:'user'
}).save()
 new role({
    name:'admin'
}).save()

})

//routes
app.use(express.json())
const userRoute=require("./api/routes/user")
const mcqRoute=require("./api/routes/mcq");
const authRoute=require('./api/routes/Authentication');
const testRoute=require('./api/routes/test');
app.use('/users',userRoute)
app.use('/mcqs',mcqRoute)
app.use('/auth',authRoute)
app.use('/test',testRoute)