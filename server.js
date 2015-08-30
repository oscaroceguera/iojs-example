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
	let uri = req.url;

	if(uri.startsWith('/index') || uri === '/'){
		return serveIndex(res);
	}

	if(uri === '/app.js'){
		return serveApp(res)
	}

	res.statusCode = 404;
	res.end(`404 not found: ${uri}`);
}

function serveIndex(res){
	let index = path.join(__dirname, 'public', 'index.html');
	let rs = fs.createReadStream(index);

	res.setHeader('Content-Type', 'text/html');
	rs.pipe(res);

	rs.on('error', function(err){
		res.setHeader('Content-Type', 'text/html');
		res.end(err.message);
	}) ;
}

function serveApp(res){
	let app = path.join(__dirname, 'public', 'app.js');
	let rs = fs.createReadStream(app);

	res.setHeader('Content-Type', 'text/javascript');
	rs.pipe(res);

	rs.on('error', function(err){
		res.setHeader('Content-Type', 'text/plain');
		res.end(err.message);
	}) ;
}

function onListening(){
	console.log("servidor en escuchando en el puerto : " + port);
}