// **************  Funciones de carga de las vistas index, contact y construir
exports.index = function (req, res){
	res.render('index');
};

exports.contacto = function (req, res){
	res.render('contact');
};

exports.construir = function (req, res){
	res.render('construir');
};

exports.resultados = function (req, res){
	res.render('resultados');
};

exports.resultadosdetallados = function (req, res){
	res.render('resultadosdetallados');
};

