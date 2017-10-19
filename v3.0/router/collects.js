var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Collect: function(app){
        app.post("/col_create",urlencode,function(request, response){
            db.insert('collect',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/col_search",urlencode,function(request, response){
            db.select('collect',request.body,function(result){
                response.send(result);            
            })
        })
        app.post("/col_delete",urlencode,function(request, response){
            db.delete('collect',request.body,function(result){
                response.send(result);
            })
        })
        app.post("/col_update",urlencode,function(request, response){
            db.update('collect',request.body,function(result){
                console.log(result)
                response.send(result);            
            })
        })
    }
};