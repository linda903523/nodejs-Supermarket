var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Cancel: function(app){
        app.post("/can_create",urlencode,function(request, response){
            db.insert('cancel',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/can_search",urlencode,function(request, response){
            db.select('cancel',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/can_delete",urlencode,function(request, response){
            db.delete('cancel',request.body,function(result){
                response.send(result);
            })
        })
        app.post("/can_update",urlencode,function(request, response){
            db.update('cancel',request.body,function(result){
                response.send(result);            
            })
        })
    }
};