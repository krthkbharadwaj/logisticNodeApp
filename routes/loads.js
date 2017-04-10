var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = require('./db');

router.post('/',function(req,res,next){
  con.query('INSERT INTO loads (current_location,destination_location,load_status) VALUES (?,?,?)',[req.body.current_location,req.body.destination_location,req.body.load_status],function(err,result){
    if(err) throw err;
    res.json({
      "message":"success"
    });
  });
});

router.get('/',function(req,res,next){
  con.query('SELECT * from loads',function(err,result){
      res.json(result);
  });
});


router.put('/:load',function(req,res,next){
  con.query('UPDATE loads SET current_location=?, destination_location=?, load_status=? where id=?',[req.body.current_location,req.body.destination_location,req.body.load_status,req.params.load],function(err,result){
    res.json({
      "message":"update success"
    });
  });
});

/*
**To fetch the list of available drivers for a load in the current location
*/
router.get('/:load/drivers',function(req,res,next){
  con.query('SELECT d.id,d.name,d.location,d.assigned_status from driver d,loads l where (Not d.assigned_status <=> ?) and LCASE(d.location) = LCASE(l.current_location) and l.id=?',['assigned',req.params.load],function(err,result){
    res.json(result);
  });
});

module.exports= router;
