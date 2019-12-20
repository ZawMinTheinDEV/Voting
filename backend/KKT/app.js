const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

const multer = require('multer');
app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passowrd: 'root',
    database: 'voting',
    port: '3306'
});

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../frontend/public/images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name);
    }
});

const upload = multer({ storage: storage }).single('image');
app.set('view engine', 'ejs');
//app.use(cors);
app.use(bodyparser.urlencoded({ extended: true }));
con.connect((err) => {
    if (err) throw err;
    console.log('Connection established');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.get('/category', (req, res, next) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result, fields) => {
        if (err) res.status(400).json({
            err
        })
        console.log(typeof result);
        res.status(200).json({
            result
        });
    });
});




app.get('/add/category', (req, res, next) => {
    res.render('addCategory');
})
app.post('/add/category', (req, res, next) => {
    //var catName = req.body.name;
    //console.log(req);
    upload(req, res, function (err) {
        if (err)
            return res.end(err);
        else {
            // console.log(req);
            const image = `images/${req.file.filename}`;
            const sql = `INSERT INTO category (name,image) VALUES ('${req.body.name}','${image}')`;
            console.log(sql);
            con.query(sql, (err, result, fields) => {
                if (err) throw err;
                console.log('Inserted successfully');
                var sqlAlter = `ALTER TABLE voter ADD COLUMN ${req.body.name} VARCHAR(99) DEFAULT 'active'`;
                con.query(sqlAlter, (err, result, fields) => {
                    if (err) throw err;
                    console.log('Alter voter table successfully');
                })

            });
            res.end('File is uploaded');
        }
    });


}
);

app.get('/add/participant', (req, res, next) => {
    var sql = "SELECT cid,name FROM category";
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.render('addParticipant', { result });
    })

});

app.post('/add/participant', (req, res, next) => {

    upload(req, res, function (err) {
        if (err) throw err;
        else {
            console.log(req.body);
            const image = `images/${req.file.filename}`;

            const sql = `INSERT INTO participant (cid,name,image) VALUES (${req.body.cid},'${req.body.name}','${image}')`;
            console.log(sql);
            con.query(sql, (err, result, fields) => {
                if (err) throw err;
                console.log('INSERTED participant successfully');
            })
            res.end('File is uploaded');
        }

    })
});

app.get('/participant', (req, res, next) => {
    const sql = "SELECT pid,cid,name,image FROM participant";
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(typeof result);
        console.log(result);
        res.status(200).json({
            result
        });
    });

    res.end;
});

app.post('/vote', function (req, res) {
    var pid = req.body.pid;
    var code = req.body.code;
    var cid = req.body.cid;
    var check = 'select voter.' + cid + ' from voter where code=?  and voter.' + cid + '="active"';
    //console.log(check);
    con.query(check, [code], function (err, results) {
        if (err) throw err;
        if (results.length > 0) {

            //increse vote_count for a specific code
            var increse = 'UPDATE participant P SET p.vote_count =p.vote_count+1 WHERE p.pid=?;';

            con.query(increse, [pid], function (err, results) {
                if (err) throw err;
                res.send("true");
                console.log("incremented");
            });
            // mark the code so it can't be used again
            var mark = 'UPDATE voter SET voter.' + cid + '=? where voter.code=?;';
            con.query(mark, [pid, code], function (err, results) {
                if (err) throw err;
                console.log("marked");
            });
        } else {
            // throw error is already voted 
            res.send("alredy voted for this category")
            console.log(false);
        }
        res.end;
    });


})


app.get('/login', function (req, res) {
    console.log(req.query);
    code = req.query.code;
    console.log("apple");
    console.log(code);
    if (code) {

        con.query("SELECT code FROM `voter` WHERE code=? ", [code], function (err, results, ) {
            if (err) throw err;
            if (results.length > 0) {
                console.log(true)
                res.json({
                    "result": "true"
                })


            } else {
                console.log(false)
                res.json({
                    "result": "false"
                })

            }

        });


    } else {
        res.send('please enter key');

    }
    res.end;
});
app.use(express.static(__dirname + 'images'))
app.listen(5000, 'localhost');
