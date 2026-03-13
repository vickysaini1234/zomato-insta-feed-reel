const Imagekit=require("imagekit")
require('dotenv').config();

const imagekit = new Imagekit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
});

// console.log("key",process.env.IMAGEKIT_PUBLIC_KEY);



async function uploadFile(file,filename){

   try {
     const result=await imagekit.upload({
        file: file.toString("base64"),
        fileName: filename,
    });
   
    return result;
   
    
    
   } catch (error) {
    console.log("errormis",error);
    
   }

}

module.exports={
    uploadFile,
}