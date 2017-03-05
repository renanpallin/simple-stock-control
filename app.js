const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


var db;
const TABLE_NAME = "product";
MongoClient.connect("mongodb://localhost:27017/simple_stock_control", (err, database) => {
	if (err) return console.error(err);
	db = database;
})

const port = 3000;
app.listen(port, () => console.log('Servidor iniciado na porta', port));

app.use(express.static("public"));
app.use(bodyParser.json());

app.use((req, res, next) => {
	// http://localhost:8080' is therefore not allowed access.
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Credentials', 'true');

	next();
})

app.get('/api/product', (req, res) => {
	db.collection(TABLE_NAME).find({}, {_id: false}, (err, cursor) => {
		if (err) res.send(err);

		cursor.toArray().then(arr =>{console.log(arr); res.send(arr)});
	})
})

app.put('/api/product/:id', (req, res) => {
	var id = parseInt(req.params.id);
	db.collection(TABLE_NAME).update({id}, req.body)
	 .then(found => console.log('da base:> ' + found))
	 .catch(err => console.error(err));
})

app.post('/api/product', (req, res) => {
	db.collectoin(TABLE_NAME).insertOne(req.body)
	 .then(() => res.status(200));
})
