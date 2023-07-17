const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = (req, res) => {

    const {
        name, price, description, quantity, category, createdBy
    } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }

    //res.status(200).json({ file: req.files, body: req.body });
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save()
        .then(product => {
            res.status(201).json({ product });
        })
        .catch(error => {
            res.status(400).json({ error });
        });

}

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;

    Category.findOne({ slug: slug })
        .select('_id type')
        .exec()
        .then(category => {
            if (!category) {
                return res.status(400).json({ error: 'Category not found' });
            }

            Product.find({ category: category._id })
                .exec()
                .then(products => {
                    if(category.type){
                   if(products.length > 0){
                    res.status(200).json({
                        products,
                        // priceRange: {
                        //     under5k: 5000,
                        //     under10k: 10000,
                        //     under15k: 15000,
                        //     under20k: 20000,
                        //     under30k: 30000,
                        // },
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price > 5000 && product.price <=10000),
                            under15k: products.filter(product => product.price > 10000 && product.price <=15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <=20000),
                            under30k: products.filter(product => product.price > 20000 && product.price <=30000),
                        }
                    });
                   } 
                }
                else{
                    res.status(200).json({products});
                }
                })
                .catch((error) => {
                    res.status(400).json({ error });
                })
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};



exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params
    console.log("req.params",productId);
    if (productId) {
      Product.findOne({ _id: productId })
        .then((product) => {
          if (product) {
            return res.status(200).json({ product });
          } else {
            return res.status(404).json({ error: "Product not found" });
          }
        })
        .catch((error) => {
          return res.status(400).json({ error });
        });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  };
  


  exports.deleteProductById = async (req, res) => {
    try {
      const { productId } = req.body.payload;
      if (productId) {
        const result = await Product.deleteOne({ _id: productId }).exec();
        res.status(202).json({ result });
      } else {
        res.status(400).json({ error: "Params required" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };
  
  
  exports.getProducts = async (req, res) => {
    const products = await Product.find({ createdBy: req.user._id })
      .select("_id name price quantity slug description productPictures category")
      .populate({ path: "category", select: "_id name" })
      .exec();
  
    res.status(200).json({ products });
  };