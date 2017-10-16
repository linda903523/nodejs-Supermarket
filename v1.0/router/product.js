var DBh = require('../DBHelper.js');
var product = {
    "/create":function(_data,_callback){
        // console.log(_data.name)
        DBh.add('users',_data,function(result){
            _callback(result);       
        });
    },
    "/search":function(_data,_callback){
        DBh.select('users',_data,function(result){
            _callback(result);
        });
     },
    "/delecte":function(_data,_callback){
        DBh.delecte('users',_data,function(result){
            _callback(result);       
        });
    },       
    /*"/change":function(_data,_callback){
        DBh.select('users',_data,function(result){
            _callback(result);
        });
    }*/
}
module.exports = product;
