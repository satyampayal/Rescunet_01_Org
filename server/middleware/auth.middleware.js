import jwt from "jsonwebtoken";
const isLoggedIn=async (req,res,next)=>{
    const {token}=req.cookies;
    console.log(token)
    if(!token){
     return next(res.json({
        message:"First logged In"
     }))
    }
    const tokenDetails=await jwt.verify(token,process.env.JWT_SECRET)
    if(!tokenDetails){
        return next(res.json({
            message:"Token not verify"
         }))
    }
    req.user=tokenDetails;
     next();
}

export default isLoggedIn