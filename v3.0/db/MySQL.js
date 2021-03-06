var mysql = require('mysql');

//创建连接池
var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : 3306,
  database : 'react',
  multipleStatements: true
});


module.exports = {
	select: function(tsql, callback){
		pool.query(tsql, function(error, rows){
      if(rows.length > 1){
        callback({rowsCount: rows[1][0]['rowsCount'], data: rows[0]});
      } else {
        callback(rows);
      }
		})
	}
}