var express = require('express');
var bodyParser= require('body-parser')
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3001;

server.listen(port, function () {
	console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

// MongoDB Driver Setup 
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/test';

// for parsing application/json
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.post('/save', function (request, response){
	console.log('POST request');
	MongoClient.connect(url, function(err, database) {
		if (err) return console.log(err);
		database.collection('students').remove({}, function(err, n){
			if(err) return console.log(err);
			database.collection('students').insert(request.body, function(err, r) {
				if(err) return console.log(err)
				database.close();
				response.send('Saved');
			});
		});	
	});
});

app.get('/fetch', function (request, response) {
	console.log('GET request');
	MongoClient.connect(url, function(err, database) {
		if (err) return console.log(err);
		database.collection('students').find().toArray(function(err, results) {
			database.close();
			response.json(results);
		});
	});
});