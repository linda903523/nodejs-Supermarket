var db = require('../DBHelper.js');

//路由映射表
//路由映射规则
var router = {
    "/register":function(_data,_callback){
        db.insert('test1705',_data,function(result){
            _callback(result);
        })
    },
    "/login":function(_data,_callback){
        db.find('test1705',_data,function(result){
            _callback(result);
        })
    },
    "/logout": {
        get: function(){
            //
        },
        post: function(){
            //
        }
    }
}

/*module.exports = {
    Register:function(_pathname,_data,_callback){
        if(router[_pathname]){
            router[_pathname](_data,function(result){
                _callback(result);
            });
        }
    }
}*/

module.exports = router;