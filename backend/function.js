var source = require('./ZMT/source');
var con = source.dbConnection;



//UPDATE voter V ,participant p   SET p.vote_count =p.vote_count-1 WHERE p.cid=1 AND voter.code='002Ou1zQ'
//deleteVote("002Ou1zQ", '1')
function deleteVote(code, cid) {
    //check if the code is already used
    var decrese = 'UPDATE voter V ,participant p   SET p.vote_count =p.vote_count-1 WHERE p.pid=v.' + cid + ' AND v.code=?';
    //console.log(check);
    con.query(decrese, [code], function (err, results) {
        if (err) throw err;



        // mark the code so it can't be used again
        var mark = 'UPDATE voter SET voter.' + cid + '="active" where voter.code=?;';
        con.query(mark, [code],function (err, results) {
            if (err) throw err;
            console.log("marked");
        });

    });
}

//vote('002Ou1zQ', 1, 1);
function vote(code, cid, pid) {

    //check if the code is already used
    var check = 'select voter.' + cid + ' from voter where code=?  and voter.' + cid + '="active"';
    //console.log(check);
    con.query(check, [code], function (err, results) {
        if (err) throw err;
        if (results.length > 0) {

            //increse vote_count for a specific code
            var increse = 'UPDATE participant P SET p.vote_count =p.vote_count+1 WHERE p.pid=?;';

            con.query(increse, [pid], function (err, results) {
                if (err) throw err;
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



