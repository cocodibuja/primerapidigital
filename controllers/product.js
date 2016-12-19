
'use strict'
const Product = require('./models/product')
function getProduct(id){

}

function getProducts(req,res){
      Product.find({},(err,products) =>{
        if(err) res.status(500).send({message:`error al salvar la base de datos ${err}`})
        if(!products) res.status(404).send({message:`No existen productos`})
        res.status(200).send({products:products})
    })
}

function updateProduct(id){

}

function deleteProduct(id){

}

exports = {
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}