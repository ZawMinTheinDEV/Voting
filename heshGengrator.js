var mysql = require('mysql');
//var source=require('./source');
var con = mysql.createConnection({
    host: source.host,
    user: source.userName,
    passowrd: source.password,
    database: source.dbName,
    WebSocket: "C:/xampp/mysql/mysql.sock",
});

con.connect(function (err) {
    if (err) throw err;

    console.log("connected");



    for (var i = 0; i < 100; i++) {
        var sql = "INSERT INTO voter (code) values  ('" + rand() + "'),('" + rand() + "'),('" + rand() + "'),('" + rand() + "'),('" + rand() + "'), ('" + rand() + "'),('" + rand() + "'),('" + rand() + "'),('" + rand() + "'),('" + rand() + "');";

        console.log(sql);

        con.query(sql, function (err, result) {
            if (err) throw err;

        });

    } console.log("1000 record inserted");
}
);
function rand() {
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var length = 8;


    var rtn = "";
    for (var i = 0; i < length; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));

    }
    return rtn;





}