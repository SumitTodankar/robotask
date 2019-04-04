const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config({path:'./.env'});
const port = process.env.PORT || 5000;

/*****MongoDb Connection********/
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

    mongoose.connect('mongodb://test:test123@ds149894.mlab.com:49894/tryy-testing',{useNewUrlParser:true},function(err,db){
        if(err){console.log(err);}
        else{
            // console.log(db)
            console.log('Connection Initiated..........')
        }

    })
const connection = mongoose.connection;
autoIncrement.initialize(connection);
/******************************/

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = require('./routes/index.route')


app.use('/',router)


const server = http.createServer(app);
server.listen(port, ()=>{
    console.log(`Server listening on port: ${port}.`)
})

