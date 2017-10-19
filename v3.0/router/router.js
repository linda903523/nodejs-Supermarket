var user = require('./users.js');
var product = require('./products.js');
var purchase = require('./purchases.js');
var receipt = require('./receipts.js');
var collect = require('./collects.js');
var cancel = require('./cancels.js');
var supplier = require('./suppliers.js');
var path = require('path');

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
        app.use(express.static(path.resolve(__dirname, '../')));

        user.User(app);
        product.Product(app);
        purchase.Purchase(app);
        receipt.Receipt(app);
        collect.Collect(app);
        cancel.Cancel(app);
        supplier.Supplier(app)

        app.listen(12);
    }
}