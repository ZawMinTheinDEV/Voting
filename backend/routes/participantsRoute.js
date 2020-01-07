const express = require("express");
const router = express.Router();
const con = require(`${__dirname}/../databaseConnect`);
const upload = require(`${__dirname}/../multer`);
const addParticipant = (req, res, next) => {
  upload(req, res, function(err) {
    if (err) throw err;
    else {
      console.log(req.body);
      const image = `images/${req.file.filename}`;

      const sql = `INSERT INTO participant (cid,name,image) VALUES (${req.body.cid},'${req.body.name}','${image}')`;
      console.log(sql);
      con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log("INSERTED participant successfully");
      });
      res.end("File is uploaded");
    }
  });
};

const getParticipants = (req, res, next) => {
  const sql = "SELECT pid,cid,name,image FROM participant";
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(typeof result);
    res.status(200).json({
      result
    });
  });
};

const getParticipantsByCategory = (req, res, next) => {
  const sql = `SELECT pid,cid,name,image,vote_count FROM participant WHERE cid = ${req.params.id}`;
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    console.log(typeof result);
    res.status(200).json({
      result
    });
  });
};
const deleteParticipant = (req, res, next) => {
  const sql = `DELETE FROM participant WHERE pid=${req.params.id}`;
  console.log(sql);
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "deleted"
    });
  });
};

router
  .route("/")
  .post(addParticipant)
  .get(getParticipants);
router
  .route("/:id")
  .get(getParticipantsByCategory)
  .post(deleteParticipant);

module.exports = router;
