// **************  Importar modelos y datos de configuración
var models = require('../models/models.js'); 	// Modelos de la base de datos
var data_config = require('./data_config.js');  // Importamos módulo con las configuraciones
var app_password = data_config.admin.password;  // Variable con el password del administrador

// **************  Funciones de logeado en el admin
exports.admin = function(req, res){
	res.render("admin/form");
};

exports.login = function(req, res){
	if (req.body.password === app_password){
		// Clave válida, mostramos el listado de productos en versión admin
		models.Product.find(function(error, documento){
			if(error){console.log(error);}
			res.render('admin/index', {products: documento });
		});
	}else{
		// Clave no válida, redireccionamos al home
		res.redirect("/");
	}
};