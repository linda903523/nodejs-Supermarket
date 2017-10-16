var DBh = require('../DBHelper.js');
var user = {
    "/register":function(_data,_callback){
        DBh.insert('users',_data,function(result){
            _callback(result);
        })
    },
    "/login":function(_data,_callback){
        DBh.select('users',_data,function(result){
            _callback(result);
        });
    }      
}
module.exports = user;