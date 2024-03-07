const mongoose = require("mongoose");

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:Number,
    stock:Number,
    category:String,
    thumbnail:String,
    status:Boolean,
});

const productsModel = mongoose.model(productsCollection, productsSchema);

module.exports = productsModel;