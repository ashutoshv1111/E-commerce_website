const express = require('express');
const { initialData } = require('../../controllers/admin/initialData');
const { requireSignin, adminMiddleware } = require('../../middleware');
const router = express.Router();


router.post('/initialdata',requireSignin, adminMiddleware, initialData);


 
module.exports = router;