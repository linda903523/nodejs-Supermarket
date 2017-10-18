var user = require('./user.js');
var product = require('./product.js');
var purchase = require('./purchase.js');
var receipt = require('./receipt.js');
var collect = require('./collect.js');

module.exports = {
    Handle: function(express){
        var app = express();
        app.all('*', function(req, res, next) {
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
        app.use(express.static(__dirname + '/'));

        user.User(app);
        product.Product(app);
        purchase.Purchase(app);
        receipt.Receipt(app);
        collect.Collect(app);

        app.listen(12);
    }
}