const express = require('express');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const { validateSigninRequest,validateSignupRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();
const {requireSignin} = require('../../middleware')

router.post('/admin/signup',validateSignupRequest,isRequestValidated, signup );
router.post('/admin/signin',validateSigninRequest,isRequestValidated, signin );
router.post('/admin/signout', signout);

 
module.exports = router;