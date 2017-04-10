var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = require('./db');

router.post('/',function(req,res,next){
  con.query('INSERT INTO driver (name,location) VALUES (?,?)',[req.body.name,req.body.current_location],function(err,result){
    if(err) throw err;
    res.json({
      "message":"success"
    });
  });
});

router.get('/',function(req,res,next){
  con.query('SELECT * from driver',function(err,result){
      res.json(result);
  });
});

router.put('/:driver',function(req,res,next){
  con.query('UPDATE driver SET name=?, location=? where id=?',[req.body.name,req.body.current_location,req.params.driver],function(err,result){
    res.json({
      "message":"update success"
    });
  });
});

/*
**Assign load to a driver
*/
router.post('/:driver/loads',function(req,res,next){
  con.query('INSERT INTO load_mapping (driver_id,load_id) VALUES(?,?)',[req.params.driver,req.body.load],function(err,result){
    res.json({
      "message":"load assigned successfully"
    }); 
  });
});

module.exports= router;
