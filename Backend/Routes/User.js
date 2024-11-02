const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const {generateToken,Auth}= require('../jwt')
const bcrypt= require('bcrypt')


router.post('/register',async(req,res)=>{
    const data= req.body
    console.log('Received registration data:', data);
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    try {
        const newuser = new User(data)
        console.log('Role before saving:', newuser.roles);
    
    const token = generateToken({id:newuser.id})

    res.cookie('token',token,{
        httpOnly:true,
        maxAge: 15 * 60 * 1000,
    })
    const savedUser= await newuser.save()
       res.status(200).json({token, user: savedUser });
    } catch (error) {
        console.log(error);
        res.status(401).json({Error:"internal error "})
        
    }
})
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      // console.log(user);
      if (!user) {
        return res.status(401).json({ error: "Invalid email" });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("isMatch:", isMatch); // Log the result of password comparison
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid  password" });
      }
  
      // Generate token for the user
      const token = generateToken({ id: user.id });
  
      // Set the token in a cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
  
      // Send response with the token
      res.json({ token });
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/logout", (req, res) => {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) })
      .json({
        success: true,
        user: "logout",
      });
  });
  
  router.get("/profile", Auth, async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login"); // Redirect to login page if user is not authenticated
      }
  
      const userId = req.user.id;
      const user = await User.findById(userId);
      // const uuser = await User.findById(userId).select('roles');
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ user,role:user.roles });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports= router