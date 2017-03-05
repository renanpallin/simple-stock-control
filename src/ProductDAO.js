export default class ProductDAO {
	constructor(){
		this.URL_SERVER = "localhost:3000/api/";
		this.PRODUCT_REST_PATH = "product/";
		this.URL_REST_PRODUCTS = "http://" + this.URL_SERVER + this.PRODUCT_REST_PATH;
		// console.log("this.URL_REST_PRODUCTS", this.URL_REST_PRODUCTS);
	}

	getAllProducts(callback){
		// let xhr = new XMLHttpRequest();
		// xhr.open("GET", this.URL_REST_PRODUCTS);
		// xhr.onreadystatechange = () => {
		// 	if(xhr.readyState != 4 || xhr.status != 200) return;
		// 	let data;
		// 	try {
		// 		data = JSON.parse(xhr.responseText);
		// 	} catch (e) {
		// 		data = {error: "deu merda aqui na requisição" + e};
		// 	}
		// 	// console.log("data: ", data);
		// 	callback && callback(data);
		// }
		// xhr.send();


		this.httpCall({
			method: "GET",
			url: this.URL_REST_PRODUCTS
		}, callback)
	}

	updateProduct(product, callback){
		// console.log(product);
		// console.log('url', this.URL_REST_PRODUCTS + product.id);
		this.httpCall({
			method: "PUT",
			url: this.URL_REST_PRODUCTS + product.id,
			data: product
		}, response => {
			callback(response);
		});
	}
	
	insertProduct(product, callback){
		this.httpCall({
			method: "POST",
			url: this.URL_REST_PRODUCTS,
			data: product
		}, callback);
	}

	httpCall(options, callback){
		let xhr = new XMLHttpRequest();
		xhr.open(options.method, options.url);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) return callback && callback({error: "[" +  xhr.status + "] " + xhr.statusText});

			let data;
			try {
				// TROCAR POR xhr.responseType = 'json';
				data = JSON.parse(xhr.responseText);
			} catch (e) {
				data = {error: "deu merda aqui na requisição" + e};
			}
			// console.log("data: ", data);
			callback && callback(data);
		}

		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(options.data));
	}
}
