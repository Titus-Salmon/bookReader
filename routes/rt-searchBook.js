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
  });
});

router.post('/loadBookPost', searchBook)

module.exports = router;