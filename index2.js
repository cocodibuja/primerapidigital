'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')


const app = express()
const port = process.env.PORT || 3000
mongoose.Promise = global.Promise;

//app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json())


app.get('/hola/:nombre',(req,res) =>{
    res.send({message:`hola ${req.params.nombre}`})
})

app.get('/api/product',(req,res) =>{ 
    Product.find({},(err,products) =>{
        if(err) res.status(500).send({message:`error al salvar la base de datos ${err}`})
        if(!products) res.status(404).send({message:`No existen productos`})
        res.status(200).send({products:products})

    })
   
})

app.get('/api/product/:productId',(req,res) =>{
    let productId = req.params.productId
    Product.findById(productId,(err, product)=>{
        if(err) res.status(500).send({message:`error al salvar la base de datos ${err}`})
        if(!product) res.status(404).send({message:`El product no existe`})
        res.status(201).send({message:'producto recibido', product: product})
    })
})

app.post('/api/product',(req,res) =>{
    console.log('POST /api/product')
    console.log(req.body)
    /** almacenamos un nuevo producto */
    
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err,productStored) =>{
        if(err) res.status(500).send({message:`error al salvar la base de datos ${err}`})
        res.status(201).send({product: productStored})
       
 })


})



app.put('/api/product/:productId',(req,res) =>{
  let productId = req.params.productId
  let update = req.body
  Product.findByIdAndUpdate(productId,update,(err,productUpdated)=>{
     if(err) res.status(500).send({message:`error al actualizar la base de datos ${err}`})
     if(!product) res.status(404).send({message:`El product no existe`})
      res.status(200).send({message:'producto actualizado', product: productUpdated})
          
  })

})

app.delete('/api/product/:productId',(req,res) =>{
  let productId = req.params.productId
  Product.findById(productId,(err, product)=>{ // tengo el error y si lo encuentra tengo el producto
         if(err) res.status(500).send({message:`error al borrar la base de datos ${err}`})
         if(!product) res.status(404).send({message:`El product no existe`})
        product.remove(err =>{
             if(err) res.status(500).send({message:`error al borrar la base de datos ${err}`})
             res.status(200).send({message:'producto eliminado'})
        })
        
    })
})



/*

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://10.7.0.3:27107/data/db'); */
mongoose.connect('mongodb://localhost:27017/shop', (err,res) =>{
  if(err) {
     console.log(`error al conectar a la base de datos ${err}`) 
  }
  console.log('conexion establecida')

  app.listen(port,()=>{
	console.log(`API REST CORRIENDO EN http://localhost:${port}`)
})

})

