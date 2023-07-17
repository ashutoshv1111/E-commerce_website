{/*const Cart = require('../models/cart');

exports.addItemTocart = (req, res) => {
    try {
       

        Cart.findOne({ user: req.user._id })
            .exec()
            .then(cart => {
                if (cart) {
                    //if cart already exist update the cart
                    
                    const product = req.body.cartItems.product;
                    const item = cart.cartItems.find(c => c.product == product);
                    let condition, action;
                    

                    if(item){
                        //return res.status(201).json({ message: item });
                        condition = {user: req.user._id, "cartItems.product": product};
                        action = {
                            
                            "$set": {
                                ...req.body.cartItems,
                                "cartItems.$.quantity": item.quantity + req.body.cartItems.quantity
                            }
                        };
                        Cart.findOneAndUpdate(condition,action)
                        .exec()
                        .then(updatedCart => {
                            res.status(200).json({cart: updatedCart});
                        })
                        .catch(error => {
                            res.status(400).json({"Error updating cart:":error});
                        });
                    }else{
                        condition = {user: req.user._id};
                        action = {
                            "$push": {
                                "cartItems": req.body.cartItems
                            }
                        };
                        Cart.findOneAndUpdate(condition,action)
                        .exec()
                        .then(updatedCart => {
                            res.status(200).json({cart: updatedCart});
                        })
                        .catch(error => {
                            res.status(400).json({"Error updating cart:":error});
                        });
                    }

                    
                } else {
                    // Handle the case when cart is not found
                    // ...
                    const newCart = new Cart({
                        user: req.user._id,
                        cartItems: [req.body.cartItems]
                    });

                    newCart.save()
                        .then(newCart => {
                            res.status(201).json({ newCart });
                        })
                        .catch(error => {
                            res.status(400).json({ "Error creating new cart:":error });
                        });
                }
            })
            .catch(error => {
                res.status(400).json({ "Error finding cart:": error });
            });


    } catch (error) {
        res.status(400).json({ "Error in try-catch block:": error });
    }
};
    



// const Cart = require("../models/cart");

// function runUpdate(condition, updateData) {
//   return Cart.findOneAndUpdate(condition, updateData, { upsert: true });
// }

// exports.addItemToCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).exec();
//     if (cart) {
//       let promiseArray = [];
//       req.body.cartItems.forEach((cartItem) => {
//         const product = cartItem.product;
//         const item = cart.cartItems.find((c) => c.product == product);
//         let condition, update;
//         if (item) {
//           condition = { user: req.user._id, "cartItems.product": product };
//           update = {
//             $set: {
//               "cartItems.$": cartItem,
//             },
//           };
//         } else {
//           condition = { user: req.user._id };
//           update = {
//             $push: {
//               cartItems: cartItem,
//             },
//           };
//         }
//         promiseArray.push(runUpdate(condition, update));
//       });
//       await Promise.all(promiseArray);
//       res.status(201).json({ response: 'Cart updated successfully' });
//     } else {
//       const cart = new Cart({
//         user: req.user._id,
//         cartItems: req.body.cartItems,
//       });
//       await cart.save();
//       res.status(201).json({ cart });
//     }
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };



exports.getCartItems = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id })
        .populate("cartItems.product", "_id name price productPictures")
        .exec();
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      } else {
        res.status(200).json({ cartItems: {} });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };
  
*/}


const Cart = require('../models/cart');

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}


// exports.addItemToCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).exec();

//     if (cart) {
//       // If cart already exists, update the cart by quantity
//       const promises = req.body.cartItems.map(async (cartItem) => {
//         const product = cartItem.product;
//         const item = cart.cartItems.find((c) => c.product == product);

//         if (item) {
//           // Update existing cart item
//           item.quantity = cartItem.quantity;
//         } else {
//           // Add new cart item
//           cart.cartItems.push(cartItem);
//         }

//         await cart.save();
//       });

//       await Promise.all(promises);

//       res.status(201).json({ message: 'Cart updated successfully' });
//     } else {
//       // If cart does not exist, create a new cart
//       const newCart = new Cart({
//         user: req.user._id,
//         cartItems: req.body.cartItems,
//       });

//       await newCart.save();

//       res.status(201).json({ message: 'Cart created successfully' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


exports.addItemTocart = async  (req, res) => {
  
    try {
       
        
        Cart.findOne({ user: req.user._id })
            .exec()
            .then(cart => {
              
                if (cart) {
                  
                    //if cart already exist update the cart
                    let promiseArray = []
                    
                    // const product = req.body.cartItems.product;
                    // const item = cart.cartItems.find(c => c.product == product);
                    // let condition, action;
                    

                    req.body.cartItems.forEach((cartItem) => {
                      const product = cartItem.product;
                      const item = cart.cartItems.find((c) => c.product == product);
                      let condition, update;
                      if (item) {
                        condition = { user: req.user._id, "cartItems.product": product };
                        update = {
                          "$set": {
                            "cartItems.$": cartItem,
                          },
                        };
                      } else {
                        condition = { user: req.user._id };
                        update = {
                          "$push": {
                            "cartItems": cartItem,
                          },
                        };
                      }
                      promiseArray.push(runUpdate(condition, update));
                      //Cart.findOneAndUpdate(condition, update, { new: true }).exec();
                      // .exec((error, _cart) => {
                      //     if(error) return res.status(400).json({ error });
                      //     if(_cart){
                      //         //return res.status(201).json({ cart: _cart });
                      //         updateCount++;
                      //     }
                      // })
                    });
                    Promise.all(promiseArray)
                      .then((response) => res.status(201).json({ response }))
                      .catch((error) => res.status(400).json({ "I dont care":error }));

                    
                } else {
                    // Handle the case when cart is not found
                    // ...
                   
                    const newCart = new Cart({
                        user: req.user._id,
                        cartItems: [{
                          product: req.body.cartItems[0].product,
                          quantity: req.body.cartItems[0].quantity,
                        }]
                    });

                    

                    newCart.save()
                        .then(newCart => {
                            res.status(201).json({ newCart });
                        })
                        .catch(error => {
                            res.status(400).json({ "Error creating new cart:":error });
                        });
                }
            })
            .catch(error => {
                res.status(400).json({ "Error finding cart:": error });
            });


    } catch (error) {
        res.status(400).json({ "Error in try-catch block:": error });
    }
};
    



// const Cart = require("../models/cart");

// function runUpdate(condition, updateData) {
//   return Cart.findOneAndUpdate(condition, updateData, { upsert: true });
// }

// exports.addItemToCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ user: req.user._id }).exec();
//     if (cart) {
//       let promiseArray = [];
//       req.body.cartItems.forEach((cartItem) => {
//         const product = cartItem.product;
//         const item = cart.cartItems.find((c) => c.product == product);
//         let condition, update;
//         if (item) {
//           condition = { user: req.user._id, "cartItems.product": product };
//           update = {
//             $set: {
//               "cartItems.$": cartItem,
//             },
//           };
//         } else {
//           condition = { user: req.user._id };
//           update = {
//             $push: {
//               cartItems: cartItem,
//             },
//           };
//         }
//         promiseArray.push(runUpdate(condition, update));
//       });
//       await Promise.all(promiseArray);
//       res.status(201).json({ response: 'Cart updated successfully' });
//     } else {
//       const cart = new Cart({
//         user: req.user._id,
//         cartItems: req.body.cartItems,
//       });
//       await cart.save();
//       res.status(201).json({ cart });
//     }
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };



exports.getCartItems = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id })
        .populate("cartItems.product", "_id name price productPictures")
        .exec();
      if (cart) {
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
          cartItems[item.product._id.toString()] = {
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPictures[0].img,
            price: item.product.price,
            qty: item.quantity,
          };
        });
        res.status(200).json({ cartItems });
      } else {
        res.status(200).json({ cartItems: {} });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };


  exports.removeCartItems = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
      Cart.updateOne(
        { user: req.user._id },
        {
          $pull: {
            cartItems: {
              product: productId,
            },
          },
        }
      )
        .then((result) => {
          res.status(202).json({ result });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  };
  

  // exports.removeCartItems = (req, res) => {
  //   const { productId } = req.body.payload;
  //   if (productId) {
  //     Cart.update(
  //       { user: req.user._id },
  //       {
  //         $pull: {
  //           cartItems: {
  //             product: productId,
  //           },
  //         },
  //       }
  //     ).exec((error, result) => {
  //       if (error) return res.status(400).json({ error });
  //       if (result) {
  //         res.status(202).json({ result });
  //       }
  //     });
  //   }
  // };
  
  
