// **************  Funciones de carga de las vistas index, contact y about
exports.index = function (req, res){
	res.render('index');
};

exports.contacto = function (req, res){
	res.render('contact');
};

exports.about = function (req, res){
	res.render('about');
};