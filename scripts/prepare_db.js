var MongoClient = require("mongodb").MongoClient;

const DATABASE_NAME = "simple_stock_control";
const TABLE_NAME = "product";

var PRODUCTS_MOCK = [
			  {id: 1,category: "Sporting Goods", price: "$49.99", quantity: 9, name: "Football"},
			  {id: 2,category: "Sporting Goods", price: "$9.99", quantity: 9, name: "Baseball"},
			  {id: 3,category: "Sporting Goods", price: "$29.99", quantity: 9, name: "Basketball"},
			  {id: 4,category: "Electronics", price: "$99.99", quantity: 0, name: "iPod Touch"},
			  {id: 5,category: "Electronics", price: "$399.99", quantity: 5, name: "iPhone 5"},
			  {id: 6,category: "Electronics", price: "$199.99", quantity: 0, name: "Nexus 7"}
			];

MongoClient.connect("mongodb://localhost:27017/" + DATABASE_NAME, (err, db) => {
	if (err) return console.error(err);

	console.log(db)
	Promise.all([
		db.collection(TABLE_NAME).drop(),
		db.collection(TABLE_NAME).createIndex({id: 1}, {unique: true}),
		db.collection(TABLE_NAME)
			.insert(PRODUCTS_MOCK)
	]).then(data => {
		/*
		TODO: Colocar essa mesnagem colorida
		 */
		console.info("Banco de dados carregado com mock");
		// data.forEach(dbResponse => if(dbResponse.err))
		// data[1](dbResponse => console.info("Banco de dados carregado com mock\n" + dbResponse))
	}).catch(err => console.log('[ERRO]\n', err))
	.then(() => db.close());
})