const mysql=reuqire('mysql');
var pool=mysql.Pool({
	host:'127.0.0.1',
	port:8686,
	user:'root',
	password:'',
	database:'bs',
	connectionLimit:20
});
//导出连接池
module.exports=pool;