const mongoose=require("mongoose")


const  likeSchema = new mongoose.Schema({

       user:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"user",
              require:true
       },
       food:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"food",
              require:true
       },
      

}
,{
       timeseries:true
})

const likes=mongoose.model('like',likeSchema)

 module.exports=likes