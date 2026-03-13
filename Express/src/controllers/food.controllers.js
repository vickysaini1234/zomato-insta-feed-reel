const foodModel = require("../models/food.model")
const likeModel = require("../models/likes.model")
const saveModel=require("../models/save.model")
const storageServices = require("../serveces/storage.service")
const { v4: uuid } = require("uuid")

async function createFood(req, res) {


    //  console.log(req.foodPartner);
    // console.log(req.body);
    // console.log(req.file);


    if (!req.file) {
        return res.status(400).json({
            message: "File not uploaded"
        });
    }
    const fileUploadResult = await storageServices.uploadFile(
        req.file.buffer,
        uuid()
    );

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
    })

    res.status(201).json({
        message: "food item create successfully",
        food: foodItem
    })



}



async function getFoodItem(req, res) {

    const foodItems = await foodModel.find({})

    res.status(200).json({
        message: "food item fatch successfully",
        foodItems
    })


}


async function likeFood(req, res) {
    const { foodId } = req.body
    const user = req.user

    const isAlreadyLike = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLike) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })


        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "unlike food successfully"

        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })
    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })
    
     res.status(201).json({
        message:"food like successfully",
        like
     })
}



async function saveFood(req, res) {
    const { foodId } = req.body
    const user = req.user

    const isAlreadyLike = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLike) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })


        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: -1 }
        })

        return res.status(200).json({
            message: "unsave food successfully"

        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })
    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { saveCount: 1 }
    })
    
     res.status(201).json({
        message:"food save successfully",
        save
     })
}




module.exports = {
    createFood,
    getFoodItem,
    likeFood,
    saveFood
}