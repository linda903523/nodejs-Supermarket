var apiResult=require('./ApiResult.js');
var mongodb=require('mongodb');
var dbServer=new mongodb.Server('10.3.131.10',27017);
var db = new mongodb.Db('cuicui', dbServer);
var obj={
    insert:function(_collection,_data,_callback){
        db.open(function(error,db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            }
            db.collection(_collection,function(error,collection){
                if(error){
                 _callback(apiResult(false,null,error));
                 return false;
                }
                console.log(_data);
                collection.insert(_data);
                _callback(apiResult(true));
                db.close();
            })
        })
    },
    select:function(_collection,_condition,_callback){
        db.open(function(error,db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            }
            db.collection(_collection,function(error,collection){
                if(error){
                _callback(apiResult(false,null,error));
                return false;
                }
                db.collection(_collection).find(_condition||{}).toArray(function(err, docs) {
                    console.log(_condition);
                    console.log(typeof docs);
                    if(err){
                        _callback(apiResult(false,null,error));
                        return false;
                    }
                    else if(docs.length!=0){
                        _callback(apiResult(true,JSON.stringify(docs)));
                         // _callback({status: true, data: docs})
                         db.close();

                    }else{
                         collection.insert(_condition);
                        db.close();
                    }
                });
            })
        })
    },
    add:function(_collection,_data,_callback){
        db.open(function(error,db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            }
            db.collection(_collection,function(error,collection){
                if(error){
                _callback(apiResult(false,null,error));
                return false;
                }
                db.collection(_collection).find(_data || {}).toArray(function(err, docs) {
                    // console.log(typeof docs);
                    if(err){
                        _callback(apiResult(false,null,error));
                        return false;
                    }else if(docs.length!=0){
                        _callback(apiResult(true,JSON.stringify(docs)));
                         // _callback({status: true, data: docs})
                         db.close();
                    }else{
                        console.log(_data);
                        collection.insert(_data);
                        db.close();
                    }
                });
            })
        })
    },
    delecte:function(_collection,_data,_callback){
        db.open(function(error,db){
            if(error){
                _callback(apiResult(false,null,error));
                return false;
            }
            db.collection(_collection,function(error,collection){
                if(error){
                _callback(apiResult(false,null,error));
                return false;
                }
                db.collection(_collection).find().toArray(function(err, docs) {
                    // console.log(typeof docs);
                    if(err){
                        _callback(apiResult(false,null,error));
                        return false;
                    }
                    
                    else{
                        // console.log(JSON.stringify(docs));
                        _callback(apiResult(true,JSON.stringify(docs)));
                        console.log(_data);
                        collection.remove(_data);
                        db.close();
                    }
                });
            })
        })
    }
}
module.exports=obj;