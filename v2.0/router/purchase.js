var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Purchase: function(app){
        app.post("/pur_create",urlencode,function(request, response){
            db.insert('purchase',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/pur_search",urlencode,function(request, response){
            db.select('purchase',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/pur_delete",urlencode,function(request, response){
            db.delete('purchase',request.body,function(result){
                // console.log(result);
                response.send(result);
            })
        })
        app.post("/pur_update",urlencode,function(request, response){
            db.update('purchase',request.body,function(result){
                response.send(result);            
            })
        })
    }
};