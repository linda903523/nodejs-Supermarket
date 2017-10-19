var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Supplier: function(app){
        app.post("/sup_create",urlencode,function(request, response){
            db.find('supplier',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/sup_search",urlencode,function(request, response){
            db.select('supplier',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/sup_delete",urlencode,function(request, response){
            db.delete('supplier',request.body,function(result){
                response.send(result);
            })
        })
        app.post("/sup_update",urlencode,function(request, response){
            db.update('supplier',request.body,function(result){
                response.send(result);            
            })
        })
    }
};