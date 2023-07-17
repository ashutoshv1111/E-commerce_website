const express = require('express');
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../middleware');
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


router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getCategory', getCategories);

router.post('/category/update', upload.array('categoryImage'), updateCategories);
router.post('/category/delete', deleteCategories);

module.exports = router;