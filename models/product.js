const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    /** clase producto para almacenar name,picture,price,category,description en MONGODB */
    
    picture: String,
    name: String,
    price: {type: Number, default : 0},
    category:{type:String, enum: ['computers','phones','accesories']},
    description: String
})

module.exports = mongoose.model('Product', ProductSchema)

