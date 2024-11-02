const express= require('express')
const mongoose = require('mongoose')
const cookieParser= require('cookie-parser')
const UserRouter= require('./Routes/User')
const jobRouter=require('./Routes/jobs')
const ApplicationRouter=require('./Routes/Application')
require('dotenv').config()
const cors= require('cors')
const app=express()

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
const connectmongodb= async ()=>{
  await mongoose.connect('mongodb://127.0.0.1:27017/job-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
      console.log("database connected"); 
    
        })
      .catch((err)=> console.log(err)
      )
}

connectmongodb()



app.use(express.json())
app.use(cookieParser())

app.use('/',UserRouter)
app.use('/',jobRouter)
app.use('/',ApplicationRouter)

app.listen(4000,()=>{
    console.log("server Started");
    
})

