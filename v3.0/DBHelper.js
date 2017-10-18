var apiResult = require('./ApiResult.js');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db;

MongoClient.connect("mongodb://10.3.131.29:27017/cuicui", function(err, database) {
    if(err) throw err;
    db = database;
});

module.exports = {
    insert: function(_collection, _data, _callback){
        var i = db.collection(_collection).insert(_data).then(function(result){
            _callback(result);
        });
    },
    select: function(_collection, _condition, _callback){
        var i = db.collection(_collection).find(_condition || {}).toArray(function(error, dataset){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            } else {
                _callback(apiResult(true,dataset));
            }
        });
    },
    update:function(_collection,_data,_callback){
        var i = db.collection(_collection).update(JSON.parse(_data.lists),JSON.parse(_data.goods)).then(function(result){
            console.log(result)
            _callback(result);
        });
    },
    delete:function(_collection,_data,_callback){
        var i = db.collection(_collection).remove(_data).then(function(result){
            _callback(result);
        });
    }
}