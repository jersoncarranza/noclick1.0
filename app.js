// **************  Zona de importación de paquetes
var express = require('express'); 				// App Express
var bodyParser = require('body-parser');		// Módulo para acceder a datos de los post
var multer = require('multer'); 				// Módulo para cargar imágenes temporales
var routes = require('./routes/index'); 		// Rutas
var method_override = require('method-override'); // Módulo para sobreescribir rutas

// **************  Generamos la aplicación
var app = express();

// **************  Zona de configuraciones de la aplicación
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));  // Por defecto es true
app.use(multer({dest: "./uploads"}).single('image_item'));
app.set("view engine", "jade"); 			// Engine de las vistas -> Jade
app.use(express.static("public")); 			// Carpeta que contendrá los archivos estáticos
app.use(method_override("_method")); 		// Variable que se usará para redefinir métodos
app.use('/', routes);  						// Rutas

// **************  Arrancamos la aplicación
app.listen(8080, function() {
  console.log('Express activo en el puerto 8080');
});
