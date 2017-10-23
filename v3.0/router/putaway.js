var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var mongodb=require('mongodb');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    Putaway: function(app){
        app.post("/put_create", urlencode, function(request, response){
            db.insert("putaway",request.body, function(result){
                response.send(result);
            })
        }) 
        app.post("/put_search", urlencode, function(request, response){
            db.select("putaway",request.body, function(result){
                response.send(result);
            })
        })  
        app.post("/put_delete", urlencode, function(request, response){
            /*var goods=request.query;
            var obiectid = new mongodb.ObjectID.createFromHexString(goods._id);
            db.delete("putaway",{_id:obiectid}, function(result){*/
            db.delete("putaway",request.body, function(result){
                response.send(result);
            })
        })
        app.post("/put_updata", urlencode, function(request, response){
            db.update("putaway",request.body, function(result){
                response.send(result);
            })
        })
    }    
};