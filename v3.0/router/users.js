var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    User: function(app){
        app.post("/login", urlencode, function(request, response){
            db.select("users",request.body, function(result){
                response.send(result);
            })
        }) 
        app.post("/register", urlencode, function(request, response){
            db.find("users",request.body, function(result){
                response.send(result);
            })
        })
        app.post("/user_delete", urlencode, function(request, response){
            db.delete("users",request.body, function(result){
                response.send(result);
            })
        })
        app.post("/user_updata", urlencode, function(request, response){
            db.update("users",request.body, function(result){
                response.send(result);
            })
        })
        app.post("/user_search", urlencode, function(request, response){
            db.select("users",request.body, function(result){
                response.send(result);
            })
        })  
    }    
};