var db = require('../DBHelper.js');

var route = {
    "/register":function(_data,_callback){
        db.insert('users',_data,function(result){
            _callback(result);
        })
    },
    "/login":function(_data,_callback){
        db.select('users',_data,function(result){
            _callback(result);
        });
    } 
};
module.exports = route;