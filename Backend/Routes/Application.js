const express = require('express');
const router = express.Router();
const Application= require('../Model/Application')
const {Auth}= require('../jwt');
const User = require('../Model/User');


const checkuserrole=async (id)=>{
    const user = await User.findById(id)
    if(user.roles=="user"){
      return true
    }
    else{
     return false
    }

}

// router.post("/apply", Auth ,async (req,res)=>{
//     try {
//         const userid=req.user.id

//        if(await checkuserrole(userid)){
//         const data = req.body
//         console.log("this is",data.job);
        
//         const user = await User.findByIdAndUpdate(userid,{ $addToSet: { Apply: data.job } })
//         console.log(user
//         );
//         const newApplication =  new Application(data)
//         await newApplication.save()
//         res.status(201).json(newApplication)
//        }
//        else{
//         return res.status(401).json({mes:"admin can't apply for jobs"})
//        }
       
//     } catch (error) {
//         res.status(404).json({error:error.message})  
//     }
// })
router.post("/apply", Auth, async (req, res) => {
    try {
      const userid = req.user.id;
  
      if (await checkuserrole(userid)) {
        const data = req.body;
        console.log("my data", data);
  
        // Update the user's applied jobs
        const user = await User.findByIdAndUpdate(userid, { $addToSet: { Apply: data.job } });
        // console.log(user);
  
        // Create a new application and associate it with the current user
        const newApplication = new Application({
          ...data,  // Spread the data (e.g., job ID)
          user: userid  // Set the user field to the current user's ID
        });
  
        await newApplication.save();
        res.status(201).json(newApplication);
      } else {
        return res.status(401).json({ mes: "Admin can't apply for jobs" });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
router.get('/user/applications', Auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('Apply');
        // console.log("sdfgh",user);
        
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});
router.get("/allApp",Auth,async(req,res)=>{
    try {
        const applications =await  Application.find()
        .populate("user","firstname lastname email")
        .populate("job","title company  location")
        res.status(202).json(applications)
    
    } catch (error) {
        res.status(402).json({err:error.message})
    }
})

module.exports= router