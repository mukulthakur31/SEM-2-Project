const jwt = require('jsonwebtoken')

const Auth= (req,res,next)=>{
    const token =req.cookies.token
    if(!token){
      return  res.status(400).json({erro:"login first"})
    }
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        // console.log("this is ",decoded);
        
        req.user=decoded
        next()
    } catch (error) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}
const generateToken =(data)=>{
    return jwt.sign(data , process.env.JWT_SECRET ,{expiresIn:20000})
}

module.exports={generateToken,Auth}