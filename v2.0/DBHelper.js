var apiResult = require('./ApiResult.js');
var mongodb = require('mongodb');
var dbServer = new mongodb.Server('10.3.131.29',27017);
var db = new mongodb.Db('cuicui', dbServer);

module.exports = {
    insert:function(_collection,_data,_callback){
        db.open(function(error,db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            } else {
                db.collection(_collection,function(error,collection){
                    if(error){
                        _callback(apiResult(false,null,error));
                        return false;
                    }else{
                        console.log(_data);
                        collection.insert(_data);
                        _callback(apiResult(true));
                    }
                })                
            }
            db.close();
        })
    },
    select:function(_collection,_condition,_callback){
        db.open(function(error, db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            } else {
                db.collection(_collection, function(error, collection){
                    if(error){
                        _callback(apiResult(false,null,error));
                        return false;
                    } else {
                        collection.find(_condition || {}).toArray(function(error, dataset){
                            if(error){
                                _callback(apiResult(false,null,error));
                                return false;
                            } else {
                                _callback(apiResult(true,dataset));
                            }
                        })
                    }
                })
            }
            db.close();
        })
    },
    update:function(_collection,_data,_callback){
        console.log( _data);
        db.open(function(error,db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            } else {
                db.collection(_collection, function(error, collection){
                    if(error){
                        _callback(apiResult(false,null,error));
                        return false;
                    } else {
                        collection.update(JSON.parse(_data.lists),JSON.parse(_data.goods));
                        _callback(apiResult(true));
                    }
                })              
            }
            db.close();
        })
    },
    delete:function(_collection,_data,_callback){
        db.open(function(error, db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            } else {
                db.collection(_collection, function(error, collection){
                    if(error){
                        _callback(apiResult(false,null,error));
                        return false;
                    } else {
                        collection.remove(_data);
                        _callback(apiResult(true));
                    }
                })
            }
            db.close();
        })
    }
}