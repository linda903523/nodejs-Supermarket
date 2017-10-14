var mongodb = require('mongodb');
var dbServer = new mongodb.Server('localhost', 27017);
var db = new mongodb.Db('test', dbServer);
var apiResult = require('./ApiResult.js');

var obj = {
    insert: function(_collection,_data,_callback){
        //操作数据库
        //打开db
        db.open(function(error,db){
            if(error){
                //_callback('{status:false,data:null,message:'+error+'}');
                _callback(apiResult(false,null,error));
                return false;
            }
            db.collection(_collection,function(error,collection){
                if(error){
                    //_callback('{status:false,data:null,message:'+error+'}');
                    _callback(apiResult(false,null,error));
                    return false;
                }
                //插入数据
                collection.insert(_data);
                //_callback('{status:true,data:null,message:null}');
                _callback(apiResult(true));

                //关闭db
                db.close();
            })
        })
    },
    find: function(_collection,_data,_callback){
        //打开db
        db.open(function(error,db){
            if(error){
                //_callback('{status:false,data:null,message:'+error+'}');
                _callback(apiResult(false,null,error));
                return false;
            }
            db.collection(_collection,function(error,collection){
                if(error){
                    _callback(apiResult(false,null,error));
                    return false;
                }
                collection.find(_data).toArray(function(error,data){         
                    if(error){
                        _callback(apiResult(false,null,error));
                        return false;
                    }console.log(data);
                    /*if(_data.username != data[0].username){
                        console.log('用户名不存在');
                        _callback(apiResult(true,null,'用户名不存在'));
                        return false;
                    }else{
                        if(_data.password != data[0].password){
                            console.log('密码错误');
                            _callback(apiResult(true,null,'密码错误'));
                            return false;
                        }else{
                            console.log('登陆成功');
                            _callback(apiResult(true,null,'登陆成功'));
                        }
                    }*/
                    if(data.length>0){
                        console.log('登陆成功');
                        _callback(apiResult(true,null,'登陆成功'));
                    }else{
                        console.log('用户名不存在');
                        _callback(apiResult(false,null,'用户名不存在'));
                    }
                    db.close();
                });
            })
        })
    },
    delete: function(_collection,_data,_callback){},
    update: function(_collection,_data,_callback){}
}

module.exports = obj;