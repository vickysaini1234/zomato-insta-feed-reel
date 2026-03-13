const foodPartnerModel=require("../models/foodpartner.models")
const userModel=require("../models/user.models")
const jwt =require("jsonwebtoken")


async function authFoodPartnerMiddleware(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }

    try { 
        
    const decoded=jwt.verify(token,process.env.JWT_SECRECT)
     const foodPartner=await foodPartnerModel.findById(decoded.id)
     req.foodPartner=foodPartner;
     next()

    } catch (error) {
        
        return res.status(401).json({
            message:"invalid token"
        })
    }
}



async function authUserMiddleware(req,res,next){
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }

    try {
        
    const decoded=jwt.verify(token,process.env.JWT_SECRECT)
     const user=await userModel.findById(decoded.id)
     req.user=user;
     next()

    } catch (error) {
        
        return res.status(401).json({
            message:"invalid token"
        })
    }
}

module.exports={
    
     authFoodPartnerMiddleware,
     authUserMiddleware

}