var mysql = require('mysql');
//função anonima
var connectMYSQL = function(){
	if(!process.env.NODE_ENV){
		return mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'root',
			database:'casadocodigo'
		});
	}
	if(process.env.NODE_ENV == 'teste'){
		return mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'root',
			database:'casadocodigo_teste'
		});
	}
};
//wrapper
module.exports = function(){
	return connectMYSQL;
}