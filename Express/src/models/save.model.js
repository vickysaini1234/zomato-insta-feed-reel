const mongoose=require("mongoose")

const saveModel=new mongoose.Schema({
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

const save=mongoose.model("save",saveModel)

module.exports=save