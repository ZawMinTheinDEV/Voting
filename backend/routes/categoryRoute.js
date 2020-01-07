const express = require("express");
const router = express.Router();
const con = require(`${__dirname}/../databaseConnect`);
const upload = require(`${__dirname}/../multer`);
const renderCategory = (req, res, next) => {
  res.render("addCategory");
};

const AddCategory = (req, res, next) => {
  //var catName = req.body.name;
  //console.log(req);
  upload(req, res, function(err) {
    if (err) return res.end(err);
    else {
      // console.log(req);
      const image = `images/${req.file.filename}`;
      const sql = `INSERT INTO category (name,image) VALUES ('${req.body.name}','${image}')`;
      console.log(sql);
      con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("Inserted successfully");
        var sqlAlter = `ALTER TABLE voter ADD COLUMN \`${req.body.name}\` VARCHAR(99) DEFAULT 'active'`;
        con.query(sqlAlter, (err, result, fields) => {
          if (err) throw err;
          console.log("Alter voter table successfully");
        });
      });
      res.end("File is uploaded");
    }
  });
};

router
  .route("/")
  .get(renderCategory)
  .post(AddCategory);

module.exports = router;
