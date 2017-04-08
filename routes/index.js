var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to logistic App', drivers: 'Driver' });
});

router.post('/add-driver', function(req, res, next) {
  request.post('http://localhost:3000/drivers/api').form({'name':req.body.name,'current_location':req.body.current_location});
  res.render('index', { result: 'Driver inserted successfully' });
});

module.exports = router;
