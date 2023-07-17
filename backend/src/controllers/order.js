const Order = require("../models/order");
const Cart = require("../models/cart");
const Address = require("../models/address");


exports.addOrder = (req, res) => {
  Cart.deleteOne({ user: req.user._id })
    .exec()
    .then((result) => {
      req.body.user = req.user._id;
      req.body.orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          isCompleted: true,
        },
        {
          type: "packed",
          isCompleted: false,
        },
        {
          type: "shipped",
          isCompleted: false,
        },
        {
          type: "delivered",
          isCompleted: false,
        },
      ];
      const order = new Order(req.body);
      return order.save();
    })
    .then((order) => {
      res.status(201).json({ order });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};




// exports.addOrder = (req, res) => {
//   req.body.user = req.user._id;
//   const order = new Order(req.body);
//   order
//     .save()
//     .then((order) => {
//       res.status(201).json({ order });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };


// exports.getOrders = (req, res) => {
//   Order.find({ user: req.user._id })
//     .select("_id paymentStatus paymentType orderStatus items")
//     .populate("items.productId", "_id name productPictures")
//     .exec((error, orders) => {
//       if (error) return res.status(400).json({ error });
//       if (orders) {
//         res.status(200).json({ orders });
//       }
//     });
// };
exports.getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec()
    .then((orders) => {
      res.status(200).json({ orders });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


// exports.getOrder = (req, res) => {
//   Order.findOne({ _id: req.body.orderId })
//     .populate("items.productId", "_id name productPictures")
//     .lean()
//     .exec((error, order) => {
//       if (error) return res.status(400).json({ error });
//       if (order) {
//         Address.findOne({
//           user: req.user._id,
//         }).exec((error, address) => {
//           if (error) return res.status(400).json({ error });
//           order.address = address.address.find(
//             (adr) => adr._id.toString() == order.addressId.toString()
//           );
//           res.status(200).json({
//             order,
//           });
//         });
//       }
//     });
// };

// exports.getOrder = async (req, res) => {
//   try {
//     const order = await Order.findOne({ _id: req.body.orderId })
//       .populate("items.productId", "_id name productPictures")
//       .lean();

//     if (order) {
//       const address = await Address.findOne({ user: req.user._id }).exec();

//       if (address) {
//         order.address = address.address.find(
//           (adr) => adr._id.toString() == order.addressId.toString()
//         );
//       }

//       res.status(200).json({ order });
//     } else {
//       res.status(404).json({ error: "Order not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.getOrder = (req, res) => {
  Order.findOne({_id: req.body.orderId})
  .populate("items.productId", "_id name productPictures")
  .lean()
  .exec()
  .then((order) =>{
    if(order){
      Address.findOne({
        user: req.user._id,
      }).exec()
        .then((address) => {
          order.address = address.address.find(
            (adr) => adr._id.toString == order.addressId.toString()
          );
          res.status(200).json({
            order,
          })
        })
        .catch((error) => {
          return res.status(400).json({ error })
        })
    }
  })
  .catch((error) => {
    return res.status(400).json({ error })
  })
}

