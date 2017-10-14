var http = require('http');
var router = require('./router/router.js');

http.createServer(function(request, response){
    router.Register(request, response);
}).listen(81);