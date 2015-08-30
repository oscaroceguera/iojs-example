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
	let index = path.join(__dirname, 'public', 'index.html');
	let rs = fs.createReadStream(index);

	/**
	 * String de lectura
	 * "rs.pipe(res)" : Encausar el string de lectura al string de salida
	 * Un strin tiene event emiters
	 */
	res.setHeader('Content-Type', 'text/html');
	rs.pipe(res);

	rs.on('error', function(err){
		res.setHeader('Content-Type', 'text/html');
		res.end(err.message);
	}) ;

	
}

function onListening(){
	console.log("servidor en escuchando en el puerto : " + port);
}