const st = require('st'); // servidor estatico
const path = require('path');
const course = require('course'); // rutas estaticas
const jsonBody = require('body/json');
const helper = require('../helper/');

const router = course();

const mount = st({
	path : path.join(__dirname, '..', 'public'),
	index : 'index.html',
	passthrough : true
});

router.post('/process', function(req, res){
	jsonBody(req,res,{ limit : 3 * 1024 * 1024 },function(err,body){
		if(err) return fail(err,res)

		var converter = helper.convertVideo(body.images);

		converter.on('video', function(video){
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({video:video}))
		})
	})
});

function onRequest(req,res){
	mount(req, res, function(err){
		if (err) return res.end(err.message)

		router(req,res, function(err){
			if(err) return fail(err, res)

			res.statusCode = 404;
			res.end(`Not found ${req.url}`);
		});
	})
}

function fail(err, res){
	res.statusCode = 500;
	res.setHeader('Content-Type', 'text/plain');
	res.end(err.message)
}

module.exports = onRequest;