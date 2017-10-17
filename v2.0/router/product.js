var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Product: function(app){
        app.post("/create",urlencode,function(request, response){
            db.insert('products',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/search",urlencode,function(request, response){
            db.select('products',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/delete",urlencode,function(request, response){
            db.delete('products',request.body,function(result){
                console.log(result);
                response.send(result);
            })
        })
        app.post("/update",urlencode,function(request, response){
            db.update('products',request.body,function(result){
                response.send(result);            
            })
        })
    }
};
