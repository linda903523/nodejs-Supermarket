var db = require('../DBHelper.js');

var route = {
    "search":function(_data,_callback){
        // console.log(_data.name)
        db.select('users',_data,function(result){
            _callback(result);
        });
     },
    "/create":function(_data,_callback){
        db.add('users',_data,function(result){
            _callback(result);
        
        });
     }
};
module.exports = route;
