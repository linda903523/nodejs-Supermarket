var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Receipt: function(app){
        app.post("/rec_create",urlencode,function(request, response){
            db.insert('receipt',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/rec_search",urlencode,function(request, response){
            db.select('receipt',request.body,function(result){
                console.log(result);
                response.send(result);            
            })
        })
        app.post("/rec_delete",urlencode,function(request, response){
            db.delete('receipt',request.body,function(result){
                // console.log(result);
                response.send(result);
            })
        })
        app.post("/rec_update",urlencode,function(request, response){
            db.update('receipt',request.body,function(result){
                response.send(result);            
            })
        })
    }
};