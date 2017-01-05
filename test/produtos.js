var express = require('../config/express')();
var request = require('supertest')(express);
describe('#ProdutosController', function(){
	beforeEach(function(done){
		var conn = express.infra.connectionFactory();
		conn.query("delete from livros", function(ex, result){
			if(!ex){
				done()
			}
		});
	})
	it('listagem json', function(done){
		request.get('/produtos')
		.set('Accept','application/json')
		.expect(200,done);
	});
	it('#cadastra um novo produto com dados invalidos', function(done){
		request.post('/produtos')
		.send({
			titulo:"",
			descricao:"Novo livro",
			preco:40
		})
		.expect(400,done);
	});
	it('#cadastra um novo produto com dados validos', function(done){
		request.post('/produtos')
		.send({
			titulo:"Teste Mocha",
			descricao:"Usando Mocha para testar",
			preco:40.00
		})
		.expect(200,done);
	});

});


/*
//usando mocha
var http = require('http');
var assert = require('assert');
describe('#ProdutosController', function(){
	it('listagem json', function(done){
		var configuracoes = {
			hostname:'localhost',
			port: 3000,
			path: '/produtos',
			headers:{
				'Accept':'application/json'
			}
		};
		http.get(configuracoes, function(res){
			assert.equal(res.statusCode, 302);
			assert.equal(res.headers['content-type'], 'application/json;charset=utf-8');
			done();
		});
	});
});
*/