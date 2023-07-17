const Page = require("../../models/page");

exports.createPage = (req, res) => {
  const { banners, products } = req.files;
  if (banners && banners.length > 0) {
    req.body.banners = banners.map((banner, index) => ({
      img: `${process.env.API}/public/${banner.filename}`,
      navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  if (products && products.length > 0) {
    req.body.products = products.map((product, index) => ({
      img: `${process.env.API}/public/${product.filename}`,
      navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  req.body.createdBy = req.user._id;


Page.findOne({ category: req.body.category })
  .exec()
  .then((page) => {
    if (page) {
      return Page.findOneAndUpdate({ category: req.body.category }, req.body, {
        new: true,
      }).exec();
    } else {
      const newPage = new Page(req.body);
      return newPage.save();
    }
  })
  .then((updatedPage) => {
    return res.status(201).json({ page: updatedPage });
  })
  .catch((error) => {
    return res.status(400).json({ error });
  });


};
  
  exports.getPage = (req, res) => {
    const { category, type } = req.params;
    if (type === "page") {
      Page.findOne({ category: category })
        .exec()
        .then((page) => {
          if (page) {
            return res.status(200).json({ page });
          }
          // Handle the case when the page is not found
          return res.status(404).json({ error: "Page not found" });
        })
        .catch((error) => {
          return res.status(400).json({ error });
        });
    }
  };
  










// const page = new Page(req.body);



// page.save()
//   .then(savedPage => {
//     console.log('savedPage');
//     return res.status(201).json({ page: savedPage });

//   })
//   .catch(error => {
//     console.log('error');
//     return res.status(400).json({ error });
//   });



// };





//   Page.findOne({ category: req.body.category }).exec((error, page) => {
//     if (error) return res.status(400).json({ error });
//     if (page) {
//       Page.findOneAndUpdate({ category: req.body.category }, req.body).exec(
//         (error, updatedPage) => {
//           if (error) return res.status(400).json({ error });
//           if (updatedPage) {
//             return res.status(201).json({ page: updatedPage });
//           }
//         }
//       );
//     } else {

//     }
//   });
// };




    // page.save((error, page) => {
  //   if (error) return res.status(400).json({ error });
  //   if (page) {
  //     return res.status(201).json({ page });
  //   }
  // });