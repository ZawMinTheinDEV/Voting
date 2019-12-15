var source = require('./source');
var con = source.dbConnection;

vote('002Ou1zQ', 1, 1);
function vote(code, cid, pid) {

    //check if the code is already used
    var check = 'select voter.' + cid + ' from voter where code="' + code + '" and voter.' + cid + '="active"';
    console.log(check);
    con.query(check, function (err, results) {
        if (err) throw err;
        if (results.length > 0) {

            //increse vote_count for a specific code
            var increse = 'UPDATE participant P SET p.vote_count =p.vote_count+1 WHERE p.pid=' + pid + ';';

            con.query(increse, function (err, results) {
                if (err) throw err;
                console.log("incremented");
            });
            // mark the code so it can't be used again
            var mark = 'UPDATE voter SET voter.' + cid + '=' + pid + ' where voter.code="' + code + '";';
            con.query(mark, function (err, results) {
                if (err) throw err;
                console.log("marked");
            });
        } else {
            // throw error is already voted 
            console.log(false);
        }
    });


}
// addCategory("queen","queen.jpg");
function addCategory(name, image) {

    var insert = ' INSERT INTO `category`(`name`, `image` ) VALUES ("' + name + '","' + image + '");';
    con.query(insert, function (err, results) {
        if (err) throw err;
    });

    var add = 'ALTER TABLE voter ADD ' + name + '  varchar(20) default "active";';
    con.query(add, function (err, results) {
        if (err) throw err;
    });
}

//addParticipants(1,"ma ma","mama.jpg");
function addParticipants(cid, name, image) {
    var insert = ' INSERT INTO `participant`( `cid`, `name`, `image` ) VALUES (' + cid + ',"' + name + '","' + image + '");';
    con.query(insert, function (err, results) {
        if (err) throw err;
    });





}



