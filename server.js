'use strict'

const http = require('http');
const fs = require('fs'); // Cargar archivo
const path = require('path'); // Manejo de rutas de archivos
const port = process.env.PORT || 8080;

const server = http.createServer();

server.on('request', onRequest);
server.on('listening', onListening)

server.listen(port)

function onRequest(req, res){
	/**
	 * Crear rutas de un archivo sin usar strings
	 * "path.join" : permite concatenar rutas y directorios
	 * "__dirname" : directorio actual
	 */
	let fileName = path.join(__dirname, 'public', 'index.html');

	// Cargar archivo de manera asincrona
	fs.readFile(fileName, function(err, file){
		if(err){
			return res.end(err.message);
		}
		
		res.end(file);
	});
}

function onListening(){
	console.log("servidor en escuchando en el puerto : " + port);
}