//CRUD API endpoints
const express=require('express');
const Product=require('../models/Product');

const router=express.Router();

//GET /products: Fetch the list of all products.
router.get('/', async(req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

//GET /products/:id: Fetch details of a specific product by ID.
router.get('/:id',async(req,res)=>{
  try{
    const product=await Product.findById(req.params.id);
    if(!product) return res.status(404).json({error:'Product not found'})
    res.status(200).json(product);
   }
   catch(err){
    res.status(500).json({error:err.message});
   }
});

//POST /products: Create a new product.
router.post('/', async(req,res)=>{
    try{
        const newProduct=new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});

//PUT /products/:id: Update an existing product by ID.
router.put('/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

//DELETE /products/:id: Delete a product by ID.
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;