module.exports = function(app){
	var listaProdutos = function(req, res, next){
	var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    produtosDAO.lista(function(erros,resultados){
    	console.log(erros);
    	if (erros){
    		return next(erros);
    	}
        res.format({
            html: function(){
                res.render('produtos/lista',{lista:resultados});
            },
            json: function(){
                res.json(resultados)
            }
        });
    });
    connection.end();
		};

	app.get('/produtos',listaProdutos);

	app.get('/produtos/form', function(req, res){
		res.render('produtos/form',{errosValidacao:{}, produtos:{}});
	});

	app.post('/produtos', function(req, res){
		var produtos = req.body;

		req.assert('titulo','Campo Obrigatório').notEmpty();
		req.assert('preco', 'Formato invalido').isFloat();
		var erros = req.validationErrors();
		if(erros){
			res.format({
            html: function(){
                res.status(400).render('produtos/form', {errosValidacao:erros, produtos:produtos});
            },
            json: function(){
                res.status(400).json(erros)
            }
        });
			return;
		}
		
		console.log(produtos);
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.salva(produtos,function(erros,resultados){
			console.log(erros);
			listaProdutos(req, res);
		});
	});

}