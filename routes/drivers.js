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

  con.query('INSERT INTO driver (name,location) VALUES (?,?)',[req.body.name,req.body.current_location],function(err,result){
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
  con.query('SELECT * from driver',function(err,result){
      res.json(result);
  });
});

router.put('/api/:driver',function(req,res,next){
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
  con.query('UPDATE driver SET name=?, location=? where id=?',[req.body.name,req.body.current_location,req.params.driver],function(err,result){
    res.json({
      "message":"update success"
    });
  });
});

module.exports= router;
