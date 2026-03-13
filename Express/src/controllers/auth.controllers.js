const userModel=require("../models/user.models")
const foodPartnerModel=require("../models/foodpartner.models")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


async function registerUser(req,res){
    const {fullName,email,password}=req.body;

    const isUserAlreadyexits=await userModel.findOne({
        email
    })

    if(isUserAlreadyexits){
        return res.status(400).json({
            messages:"User Already exits"
        }) 
    }
    const hashpassword= await bcrypt.hash(password,10);

    const user=await userModel.create({
        fullName,
        email,
        password:hashpassword,
    })
  
     const token=jwt.sign({
        id:user._id,
     },process.env.JWT_SECRECT
    
    )
    res.cookie("token",token)

    res.status(201).json({
        message:"User Register Successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })


}

async function loginUser(req,res){
    const {email,password}=req.body;

    const user=await userModel.findOne({
        email,
       
       
    })

    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }
  
  

    const isPasswordValid=await bcrypt.compare(password,user.password)
   
       if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid  email or password"
        })
    }
  

    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRECT)

    res.cookie("token",token)

  res.status(200).json({
     message:"User Login Successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    
  })

}


async function logoutUser(req,res){

res.clearCookie("token");
res.status(200).json({
    message:"user logout successfully"
})
}



async function registerFoodPartner(req,res){
    const {name,email,password}=req.body;

    const isAccountAlreadyexits=await foodPartnerModel.findOne({
        email
    })

    if(isAccountAlreadyexits){
        return res.status(400).json({
            messages:"foodPartner Account Already exits"
        })
    }
    const hashpassword= await bcrypt.hash(password,10);

    const foodPartner=await foodPartnerModel.create({
        name,
        email,
        password:hashpassword,
    })
  
     const token=jwt.sign({
        id:foodPartner._id,
     },process.env.JWT_SECRECT
    
    )
    res.cookie("token",token)

    res.status(201).json({
        message:"foodPartner Register Successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })


}


async function loginFoodPartner(req,res){
    const {email,password}=req.body;

    const foodPartner=await foodPartnerModel.findOne({
        email,
       
       
    })

    if(!foodPartner){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }
  
  

    const isPasswordValid=await bcrypt.compare(password,foodPartner.password)
   
       if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid  email or password"
        })
    }
  

    const token=jwt.sign({
        id:foodPartner._id
    },process.env.JWT_SECRECT)

    res.cookie("token",token)

  res.status(200).json({
     message:"foodPartner Login Successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    
  })

}

async function logoutFoodPartner(req,res){

res.clearCookie("token");
res.status(200).json({
    message:"foodPartner logout successfully"
})
}



module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}