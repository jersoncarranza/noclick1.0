// **************  Importamos los módulos
var express = require('express');
var router = express.Router();

//**************  Carga de controladores
var webController = require('../controllers/web_controller');
var menuController = require('../controllers/menu_controller');
var adminController = require('../controllers/admin_controller');

// **************  Gestión de rutas index, contacto y acerca de
router.get("/", webController.index); 				// Index de la app
router.get("/contacto", webController.contacto); 	// Conctacto de la app
router.get("/construir", webController.construir); 			// Acerca de la app
//router.get("/resultados", webController.resultados); 	// Resultados

// **************  Gestión de rutas de menú
router.post('/menu', menuController.create); 		// Recibe los parámetros y crea el objeto
router.get('/menu', menuController.list); 			// Lista los objetos
router.get('/menu/new', menuController.new); 		// Pantalla de creación de nuevo objeto
router.get('/menu/edit/:id', menuController.edit);	// Vista de edición de un producto
router.put('/menu/:id', menuController.put);	// Edición de un producto
router.get('/menu/delete/:id', menuController.deleteView);// Pantalla que nos muestra un producto a borrar
router.delete('/menu/:id', menuController.delete); 	// Gestión del borrado del producto
//**
router.get('/resultados', menuController.resultados); 			// Lista los objetos
router.get('/resultadosdetallados', menuController.resultadosdetallados); 			// Lista los objetos
// **************  Gestión de rutas de administración
router.get('/admin', adminController.admin); 			// Página para ingresar contraseña
router.post('/admin', adminController.login); 			// Lista los objetos en modo admin

// **************  Exportamos las rutas
module.exports = router;