const mongoose=require("mongoose")
require('dotenv').config();

 const connectDB = async () => {
  try {
    // console.log("URIii:", process.env.MONGOOSE_URL);
    await mongoose.connect(process.env.MONGOOSE_URL); 
    console.log("MongoDB Connected"); 
  } catch (error) {
    console.error("not connect",error);
  }
};



module.exports=connectDB