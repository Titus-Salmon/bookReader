const express = require('express')
const router = express.Router()

//v//destructuring////////////////////////////////
const {
  searchBook
} = require('../routeModules/searchBookM0d')
//^//destructuring////////////////////////////////

router.get('/', function (req, res, next) {
  res.render('vw-searchBook', {
    title: 'vw-searchBook from rt-searchBook.js',
    // username: req.user.name,
    // userEmail: req.user.email,
    // userEmail_stringified: JSON.stringify(req.user.email),
  });
});

router.post('/searchBookPost', searchBook)

module.exports = router;