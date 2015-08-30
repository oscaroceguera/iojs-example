'use strict'

const http = require('http');
const path = require('path'); // Manejo de rutas de archivos
const router = require('./router');

const port = process.env.PORT || 8080;


const server = http.createServer();

server.on('request', router);
server.on('listening', onListening)

server.listen(port)

function onListening(){
	console.log("servidor en escuchando en el puerto : " + port);
}