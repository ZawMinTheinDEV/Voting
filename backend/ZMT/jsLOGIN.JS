var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require('path');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    passowrd: "root",
    database: "jstest",
    WebSocket: "C:/xampp/mysql/mysql.sock",
});
var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('c:/javascript/login.html');
});

app.get('/jslogin.js', function (req, res) {
    var username = req.query.username;
    console.log("apple");
    console.log(username);


    if (username) { 

        con.query("SELECT * FROM `hash` WHERE HASH=? ", [username], function (err, results, fields) {
            if (err) throw err;
            if (results.length) {
                req.session.loggedin = true;
                req.session.username = username;

                console.log("logged IN");
                res.write(username);
                console.log(req.session.username);
            } else {
                res.send("INcorrect key")
            }
            res.end();
        });


    } else {
        res.send('please enter key');
        res.end;
    }

});
app.listen(3001);