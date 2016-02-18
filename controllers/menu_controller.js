// **************  Importar modelos, package y datos de configuración
var models = require('../models/models.js'); 	// Modelos de la base de datos
var cloudinary = require('cloudinary'); 		// Módulo para subir imágenes a inet
var data_config = require('./data_config.js');  // Importamos módulo con las configuraciones

// Creamos unas variables con los datos de configuración que vamos a usar
var cloud_config = data_config.cloudinary;
var app_password = data_config.admin.password;

// Datos ocultos en cloudinary-config.js
cloudinary.config({
	cloud_name: cloud_config.cloud_name,
	api_key: cloud_config.api_key,
	api_secret: cloud_config.api_secret
});

// **************  Función de listado de productos
exports.list = function (req, res){
	models.Product.find(function(error, documento){
		if(error){console.log(error);}
//		console.log("esto es objeto..",documento.description);
		res.render('menu/index', {products: documento });
	});
};

// **************  Función de creación de productos
// Muestra la vista de un nuevo producto
exports.new = function(req, res){
	res.render('menu/new');
};

// Crea el producto
exports.create = function(req, res){
	// Vamos a usar el password para asegurarnos de que no pueda usarlo cualquiera
	if (req.body.password === app_password){
		// Creamos el producto con una imagen temporal
		var data = {
			title: req.body.title,
			description: req.body.description,
			pricing: req.body.pricing
		};
		var product = new models.Product(data);

		// Punto importante.  Vamos a definir lo siguiente
		// Si se carga una imagen, se subirá a internet y se guardará la nueva url
		// Si no se carga ninguna imagen, la imagen que guardamos es la de "No disponible"
		if(req.file){  						// Existe una imagen
			cloudinary.uploader.upload(req.file.path,
			  // Función anónima que se ejecuta al terminar de subir la imagen
			  // result puede ser un error
			  function(result) { 
			  	product.imageUrl = result.url;
			  	// Guardamos producto con la url de la imagen de internet
				product.save(function(err){
					res.render('index');
				});
			  },
			  {
			    public_id: 'sample_id', 
			    crop: 'limit',
			    width: 2000,
			    height: 2000
			   }
			)
		}
		else{
			// No existe imagen.  Guardamos el producto con la imagen de "No disponible"
			product.save(function(err){
				console.log(product);
				res.render('index');
			});
		}
	// Fin else de confirmación de password
	}else{
		res.render('menu/new');	
	}	
};

// **************  Función de edición de productos
// Obtenemos la id de un producto, lo buscamos en la base de datos y lo cargamos
exports.edit = function(req, res){
	var id_producto = req.params.id;
	models.Product.findOne({"_id": id_producto},function(error,producto){
		res.render("menu/edit", {product: producto});
	});
};
// Editamos un producto
exports.put = function(req, res){
	if (req.body.password === app_password){
		var data = {
			title: req.body.title,
			description: req.body.description,
			//imageUrl: "./imgs/no_disponible.png",
			pricing: req.body.pricing
		};

		if(req.file){  						// Existe una imagen
			cloudinary.uploader.upload(req.file.path,
			  function(result) { 
			  	data.imageUrl = result.url;
				models.Product.update({"_id": req.params.id}, data, function(product){
				res.redirect("/menu");
				});
			  },
			  {
			    public_id: 'sample_id', 
			    crop: 'limit',
			    width: 2000,
			    height: 2000
			   }
			);
		}
		else{
			// No existe imagen, actualizamos el producto con los nuevos datos
			models.Product.update({"_id": req.params.id}, data, function(product){
			res.redirect("/menu");
			});
		}
		console.log("Ingreso super");
	}else{//cliente
		if (req.body.password === "usuario")
		{
			var id = req.params.id;
			var self = this;
			var object;

			models.Product.findOne({"_id":id},  function(error, documento){
				if(error){console.log(error);}
				object = documento.pricing;
			
				var data = {
				pricing: object + 1
				};
				
				models.Product.update({"_id": req.params.id}, data, function(product){
				console.log("Ingreso usuario normal");
				res.redirect("../resultados");
				});
			});
		}	
		else{
		respuesta.redirect("/");		
		}
	}
};
//Editar Producto Cualquiera que entre a la pagina.
exports.modi = function(req, res){
		var data = {
			pricing: req.body.pricing
		};
	
		models.Product.update({"_id": req.params.id}, data, function(product){
			res.redirect("/menu");
		});		
};
// **************  Función de eliminación de productos
// Obtenemos la id de un producto, lo buscamos en la base de datos y lo cargamos
exports.deleteView = function(req, res){
	var id_producto = req.params.id;
	models.Product.findOne({"_id": id_producto},function(error,producto){
		res.render("menu/delete", {product: producto});
	});
};

exports.delete = function(req, res){
	if (req.body.password === app_password){
		// Actualizamos un producto con un id, con los nuevos datos
		models.Product.remove({"_id": req.params.id}, function(product){
			res.redirect("/menu");
		});
	}else{
		respuesta.redirect("/");
	}
};
exports.resultados = function (req, res){
	//models.Product.find( function(error, documento){
	models.Product.find(
		{pricing: { $gt: 19 }},
		{_id:1 , pricing:1, title:1,imageUrl:1},
		function(error, documento){
		if(error){console.log(error);}
		res.render('./resultados', {products: documento });
	}).sort( { pricing: -1 });
};



exports.resultadosdetallados = function (req, res){
	//models.Product.find( function(error, documento){
	models.Product.find(
		{pricing: { $gt: 3 }},
		{_id:1 , pricing:1, title:1,imageUrl:1},
		function(error, documento){
		if(error){console.log(error);}
		res.render('./resultadosdetallados', {resultados: documento });
	}).sort( { pricing: -1 });
};

/*
exports.resultados = function (res) {
	
	models.Product.find(function (error, documento) {
		if (error) {console.log(error)}
		console.log("Objeto......", documento);
		res.render('./resultados',{lista:documento});
		console.log("Resultados");

	})
};
*/


/*

exports.list = function (req, res){
	models.Product.find(function(error, documento){
		if(error){console.log(error);}
		console.log("esto es objeto..",documento.description);
		res.render('menu/index', {products: documento });
	});
};

*/