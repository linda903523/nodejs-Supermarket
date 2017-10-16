var url = require('url');
var user = require('./user.js');
var product = require('./product.js');
var allroute = Object.assign({},user,product);
console.log(allroute);
module.exports = {
    Handle: function(express){
        var app = express();
        app.all('*', function(req, res, next) {
            var urlstring = req.url;
            var urlobj = url.parse(urlstring,true);
            var pathname = urlobj.pathname;
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
              res.send(200);/*让options请求快速返回*/
            } else{
              next();
            }
        });
        app.listen(12);
        app.use(express.static(__dirname + '/'));

        allroute.User(app);
        allroute.Product(app);
    }
}
