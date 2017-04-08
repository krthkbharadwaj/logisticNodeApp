var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('./db');

router.post('/api',function(req,res,next){
  var con = mysql.createConnection({
    host:db.localhost,
    user:db.username,
    password:db.password,
    database:db.dbname
  });
  con.connect(function(err){
    if(err){
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });
  con.query('INSERT INTO loads (current_location,destination_location,load_status) VALUES (?,?,?)',[req.body.current_location,req.body.destination_location,req.body.load_status],function(err,result){
    if(err) throw err;
    res.json({
      "message":"success"
    });
  });
});

router.get('/api',function(req,res,next){
  var con = mysql.createConnection({
    host:db.localhost,
    user:db.username,
    password:db.password,
    database:db.dbname
  });
  con.connect(function(err){
    if(err){
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });
  con.query('SELECT * from loads',function(err,result){
      res.json(result);
  });
});


router.put('/api/:load',function(req,res,next){
  var con = mysql.createConnection({
    host:db.localhost,
    user:db.username,
    password:db.password,
    database:db.dbname
  });
  con.connect(function(err){
    if(err){
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });
  con.query('UPDATE loads SET current_location=?, destination_location=?, load_status=? where id=?',[req.body.current_location,req.body.destination_location,req.body.load_status,req.params.load],function(err,result){
    res.json({
      "message":"update success"
    });
  });
});

router.post('/api/assign/:load',function(req,res,next){
  var con = mysql.createConnection({
    host:db.localhost,
    user:db.username,
    password:db.password,
    database:db.dbname
  });
  con.connect(function(err){
    if(err){
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });
  con.query('INSERT INTO load_mapping (driver_id,load_id) VALUES(?,?)',[req.body.driver_id,req.params.load],function(err,result){
    res.json({
      "message":"load assigned successfully"
    }); 
  });
});

router.get('/api/drivers/:load',function(req,res,next){
  var con = mysql.createConnection({
    host:db.localhost,
    user:db.username,
    password:db.password,
    database:db.dbname
  });
  con.connect(function(err){
    if(err){
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });
  con.query('SELECT d.id,d.name,d.location,d.assigned_status from driver d,loads l where (Not d.assigned_status <=> ?) and LCASE(d.location) = LCASE(l.current_location) and l.id=?',['assigned',req.params.load],function(err,result){
    res.json(result);
  });
});

module.exports= router;
