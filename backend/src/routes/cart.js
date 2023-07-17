{/*const express = require('express');
const { addItemTocart, getCartItems } = require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../middleware');
const router = express.Router();


router.post('/user/cart/addtocart',requireSignin,userMiddleware, addItemTocart);
// router.post('/user/getCartItems', requireSignin, userMiddleware, getCartItems)

module.exports = router; */}


const express = require('express');
const { addItemTocart, getCartItems,removeCartItems } = require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../middleware');
const router = express.Router();


router.post('/user/cart/addtocart',requireSignin,userMiddleware, addItemTocart);
router.post('/user/getCartItems', requireSignin, userMiddleware, getCartItems);
router.post(
    "/user/cart/removeItem",
    requireSignin,
    userMiddleware,
    removeCartItems
  );

module.exports = router;