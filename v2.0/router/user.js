var db = require('../DBHelper.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    User: function(app){
        app.post("/login", urlencode, function(request, response){
            console.log(urlencode);
            db.select("users",request.body, function(result){
                console.log(result);
                response.send(result);
            })
        }) 
        app.post("/register", urlencode, function(request, response){
            console.log(urlencode);
            db.insert("users",request.body, function(result){
                console.log(result);
                response.send(result);
            })
        }) 
    }    
};