// **************  Zona de importación de paquetes
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// **************  Conexión a la base de datos

  mongoose.connect('mongodb://digimon2:sface@ds059115.mongolab.com:59115/profesores');

// **************  Schemas
// Productos
var productSchemaJSON = {
	title: String,
	description: String,
	imageUrl: String,
	pricing: Number
};

// **************  Definimos los getters del schema
var productSchema = new Schema(productSchemaJSON);

// Definimos el getter del atributo virtual "image.url"
productSchema.virtual("image.url").get(function(){
	// this es el equivalente al producto
	// Si no existe un valor en la propiedad imageUrl devolvemos el valor por defecto
	if (this.imageUrl === undefined){
		return "./imgs/no_disponible.png";
	}

	// Si llega aquí es que existe un valor en imageUrl y pasamos la url de cloudinary
	return this.imageUrl;
});

// **************  Generación de modelos
// A partir del Schema podemos generar un modelo
var Product = mongoose.model("Product", productSchema);

// **************  Exportar modelos
exports.Product = Product;