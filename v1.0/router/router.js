var url=require('url');
var querystring=require('querystring');
var user=require('./user.js');
var product=require('./product.js');
var allroute=Object.assign({},user,product);

console.log(allroute);
module.exports={
    newRegister:function(request,response){
        response.writeHead(200,{
            "Access-Control-Allow-Origin": "*", 
            "Content-type": "text/plain;charset=UTF-8",
            "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        });
        var urlstring=request.url;
        // console.log(urlstring);
        var urlobj=url.parse(urlstring,true);
        var pathname=urlobj.pathname;
        // console.log(pathname)
        var pastData='';
        request.addListener('data',function(_data){
            // console.log('cccc'+_data);
            pastData+=_data;
            // console.log('dddd'+pastData)
        })
        request.addListener('end',function(){
            var paramsObj=querystring.parse(pastData);
            allroute[pathname](paramsObj, function(result){
                response.write(result);
                response.end();
            })
        })

    }
}
