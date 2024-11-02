const express = require('express');
const router = express.Router();
const jobs= require('../Model/Jobs')
const User= require('../Model/User')

const {Auth}= require('../jwt')

const checkAdminRole = async(userId)=>{
    try {
        const  user = await User.findById(userId)
        return user.roles === "admin"
    } catch (error) {
        return false 
    }}
router.get('/all',Auth,async (req,res)=>{
    try {
        const data = await jobs.find()
        res.status(200).json(data)
       } catch (error) {
        res.status(404).json({error:"internal server error "})
       }
})

router.get('/jobs/:position',Auth,async(req,res,)=>{
    try {
        const Jobposition= req.params.position
        // const finalposition= Jobposition.toLowerCase().trim()

        const data = await jobs.find({title:{$regex:Jobposition,$options:'i'}})


        if(data.length==0){
            return res.status(200).json({mes:"no job found"})
        }

        return res.status(200).json(data)
    } catch (error) {
        res.status(400).json({err:error.message})
    }
})

router.post('/add' ,Auth, async(req,res)=>{
    try {
       if(! await checkAdminRole(req.user.id)){
       
          return res.status(403).json({error:"user does not have admin role"})
               
               }
       const data = req.body
     const newjob = new jobs(data)
     await newjob.save()
     console.log(newjob);
     
     res.status(200).json(newjob)
    } catch (error) {
     res.status(404).json({error:error.message})
    }
 
 })
 router.delete('/delete/:id',Auth,async(req,res)=>{
    try {
       if(! await checkAdminRole(req.user.id)){
       
          return res.status(403).json({error:"user does not have admin role"})
               
               }
      const jobid= req.params.id
     const response = await jobs.findOneAndDelete({_id:jobid})
     if (response) {
       res.status(200).json({ message: 'job deleted successfully' });
     } else {
       res.status(404).json({ message: 'job not found' });
     }
    } catch (error) {
     res.status(404).json({error:error.message})
    }
 
 })
module.exports = router