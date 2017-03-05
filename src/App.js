import React from 'react';

import Admin from './Admin';
import SearchBlock from './components/SearchBlock';
import ProductTable from './components/ProductTable';

// import MockData from 'MockData';

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.changeSearchFilter = this.changeSearchFilter.bind(this);
		this.changeStockOnlyFilter = this.changeStockOnlyFilter.bind(this);
		this.handleBuy = this.handleBuy.bind(this);
		this.adminUpdateProduct = this.adminUpdateProduct.bind(this);

		this.state = {
			products: [
			  {id: 1,category: "Sporting Goods", price: "$49.99", quantity: 9, name: "Football"},
			  {id: 2,category: "Sporting Goods", price: "$9.99", quantity: 9, name: "Baseball"},
			  {id: 3,category: "Sporting Goods", price: "$29.99", quantity: 9, name: "Basketball"},
			  {id: 4,category: "Electronics", price: "$99.99", quantity: 0, name: "iPod Touch"},
			  {id: 5,category: "Electronics", price: "$399.99", quantity: 5, name: "iPhone 5"},
			  {id: 6,category: "Electronics", price: "$199.99", quantity: 0, name: "Nexus 7"}
			].sort((a, b) => {
				if (a.category > b.category)
					return 1;
				else if (a.category < b.category)
					return -1;
				else
					return 0;
			}),
			// products: new MockData().getData().sort((a, b) => {
			// 	if (a.category > b.category)
			// 		return 1;
			// 	else if (a.category < b.category)
			// 		return -1;
			// 	else
			// 		return 0;
			// }),
			filterSearch: "",
			filterStockOnly: false
		}
	}

	adminUpdateProduct(newProduct){
		console.log(newProduct, 'será atualizado');
	}

	handleBuy(itemId){
		this.setState(prevState => {
			return prevState.products.map(p => {
				if (p.id == itemId){
					if (p.quantity > 0){
						p.quantity -= 1;
					}
				}
				return p;
			})
		})
		// }, x => console.log(this.state.products.filter(p => p.id === itemId)))
	}

	changeSearchFilter(filterSearch){
		this.setState({filterSearch});
	}

	changeStockOnlyFilter(filterStockOnly){
		this.setState({filterStockOnly});
	}

	render() {
		let headers = ["Name", 
					   "Price", 
					   "Qnt",
					   "Buy"];
		let adminHeaders = ["Category",
						   	"Name", 
						   	"Price", 
						   	"Qnt"];


		let products = this.state.products.filter(p => {
			return	(
				p.name.includes(this.state.filterSearch)
				&& 
				/*
				NÃO FUNCIONA: (this.state.filterStockOnly && p.stocked === true || true)
				Porque se filterStockOnly for true, ele vai testar o p.stocked === true e
				caso ele dê falso (deveríamos retornar false), ele cai no ||, enviando 
				true de qualquer maneira. Tem que ser operador ternário aqui mesmo
				 */
				(this.state.filterStockOnly ? p.quantity > 0 : true)
			)
		});


		let schemaArray = [
			{header: "Name", "productField": "name"},
			{header: "Price", "productField": "price"},
			{header: "Price", "productField": "price"},
			{header: "Price", "productField": "price"},
			{header: "Quantity", "productField": "quantity"},
			{header: "Buy", "productField": "buy"},
			{header: "Buy", "productField": "buy"},
			{header: "Buy", "productField": "buy"},
			{header: "Buy", "productField": "buy"},
		];

		// let schemaAdminArray = [
		// 	{header: "Id", "productField": "id"},
		// 	{header: "Name", "productField": "name"},
		// 	{header: "Price", "productField": "price"},
		// 	{header: "Quantity", "productField": "quantity"}
		// ];

		return (
			<div className="container">
				<br/>
				<br/>
				<div className="row justify-content-md-center">
					<div className="col-md-auto">
						<SearchBlock search={this.state.filterSearch}
									 changeSearchFilter={this.changeSearchFilter}
									 stockOnly={this.state.filterStockOnly}
									 changeStockOnlyFilter={this.changeStockOnlyFilter} />
						<br/>
						<ProductTable
									schemaArray={schemaArray}
									headers={headers}
									products={products} 
									handleBuy={this.handleBuy} />
					</div>
				</div>
				<div className="row justify-content-md-center">
					<Admin products={products}
						   adminUpdateProduct={this.adminUpdateProduct}>

					</Admin>
				</div>
			</div>
		)
	}
}


/*

						   	<ProductTable 
						   			isAdmin={true}
									headers={adminHeaders}
									products={products} 
									handleBuy={this.handleBuy} />
 */