var app = require('./config/express')();
//var rotasProdutos = require('./app/routes/produtos')(app);
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io',io);

var porta = process.env.PORT || 3000;
var server = http.listen(porta, function(){
	var host = server.address().address;
	var port = server.address().port;

    console.log("Servidor rodando");
    console.log("Host: %s", host);
    console.log("Porta: %s", port);
    console.log('http://%s:%s', host, port);

});