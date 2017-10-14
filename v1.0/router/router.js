//用户路由
//产品路由
//订单路由
//...

var url = require('url');
var querystring = require('querystring');
var apiResult = require('../ApiResult.js');
var userRoute = require('./userRoute.js');
//var productRoute = require('./productRoute.js');
//var orderRoute = require('./orderRoute.js');

//所有路由映射表
var allRoute = Object.assign({},userRoute/*,productRoute,orderRoute*/);

//http://localhost:81/register
module.exports = {
    /*Register:function(_pathname,_data,_callback){
        userRoute.Register(_pathname,_data,function(result){
            _callback(result);
        });
    }*/
    Register:function(request, response){
        var urlString = request.url;
        var urlObj = url.parse(urlString,true);
        var pathname = urlObj.pathname;
        var postData = '';

        // 允许跨域
        response.writeHead(200,{
            "Content-type":"text/html;charset=utf-8",
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Headers":"X-Requested-With",
            "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
        });

        //当前请求的路径是否有配置路由映射
        //如果没有路由映射，则直接输出错误信息
        if(!allRoute[pathname]){            
            response.end(apiResult(false,null,'请求路径错误'));
            return false;
        }

        if(request.method == 'POST'){
            request.addListener('data',function(_data){
                postData += _data;
            })
            request.addListener('end',function(){  
                var postDataObj =  querystring.parse(postData);
                allRoute[pathname](postDataObj,function(result){
                    console.log(result);
                    response.write(result);
                    response.end();          
                })
            })
        }else if(request.method == 'GET'){
            var queryObj = urlObj.query;
            if(typeof allRoute[pathname] == "function"){
                allRoute[pathname](queryObj, function(result){
                    response.write(result);
                    response.end();             
                })
            } else {
                //路由不支持当前的访问方式
                if(!allRoute[pathname][request.method]){

                }

            }
        }
    }
}