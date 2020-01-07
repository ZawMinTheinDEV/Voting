const express = require("express");
const router = express.Router();
const con = require(`${__dirname}/../databaseConnect`);

const getCategories = (req, res, next) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(typeof result);
    res.status(200).json({
      result
    });
  });
};
const deleteCategory = (req, res, next) => {
  var sql = `DELETE FROM participant WHERE cid=${req.body.cid}`;
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    sql = `DELETE FROM category WHERE cid=${req.body.cid}`;
    console.log(sql);
    con.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.status(200).json({
        message: "deleted"
      });
    });
  });
};

router
  .route("/")
  .get(getCategories)
  .post(deleteCategory);

module.exports = router;
