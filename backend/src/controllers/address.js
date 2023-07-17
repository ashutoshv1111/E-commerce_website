const address = require("../models/address");
const UserAddress = require("../models/address");

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { payload } = req.body;
  if (payload.address) {
    if (payload.address._id) {
      UserAddress.findOneAndUpdate(
        { user: req.user._id, "address._id": payload.address._id },
        {
          $set: {
            "address.$": payload.address,
          },
        }
      )
        .exec()
        .then((address) => {
          res.status(201).json({ address });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
      
    } else {
      UserAddress.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            address: payload.address,
          },
        },
        { new: true, upsert: true }
      )
        .exec()
        .then((address) => {
          res.status(201).json({ address });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
      
    }
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id })
  .exec()
  .then((userAddress) => {
    res.status(200).json({ userAddress });
  })
  .catch((error) => {
    res.status(400).json({ error });
  });

};
