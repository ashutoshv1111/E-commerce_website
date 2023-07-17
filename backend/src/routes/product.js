const express = require('express');
//const { addCategory, getCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../middleware');
const { createProduct,
     getProductsBySlug, 
     getProductDetailsById,
     deleteProductById,
    getProducts, } = require('../controllers/product');
    
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname),'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = (shortid.generate() + '-' + file.originalname);
        cb(null, uniqueSuffix);
    }
})

const upload  = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
router.get('/products/:slug', getProductsBySlug);
router.get('/product/:productId', getProductDetailsById);
router.delete(
    "/product/deleteProductById",
    requireSignin,
    adminMiddleware,
    deleteProductById
  );

  router.post(
    "/product/getProducts",
    requireSignin,
    adminMiddleware,
    getProducts
  );

//router.get('/category/getCategory', getCategories);

module.exports = router; 