var mysql=require('mysql');
// module.exports={

// dbName:'voting',
// password:'password',
// userName:'root',
// host:'localhost',
// port:'3306'
// };
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passowrd: 'root',
    database: 'voting',
  port: '3306' 
  
});

module.exports.dbConnection=con;


