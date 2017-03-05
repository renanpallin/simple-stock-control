import React from 'react';

import SearchBlock from './components/SearchBlock';
import ProductTable from './components/ProductTable';

import MockData from 'MockData';

export default class App extends React.Component {
	constructor(props){
		super(props);

		this.changeSearchFilter = this.changeSearchFilter.bind(this);
		this.changeStockOnlyFilter = this.changeStockOnlyFilter.bind(this);

		this.state = {
			products: [
			  {category: "Sporting Goods", price: "$49.99", quantity: 4, name: "Football"},
			  {category: "Sporting Goods", price: "$9.99", quantity: 2, name: "Baseball"},
			  {category: "Sporting Goods", price: "$29.99", quantity: 9, name: "Basketball"},
			  {category: "Electronics", price: "$99.99", quantity: 0, name: "iPod Touch"},
			  {category: "Electronics", price: "$399.99", quantity: 5, name: "iPhone 5"},
			  {category: "Electronics", price: "$199.99", quantity: 0, name: "Nexus 7"}
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

	changeSearchFilter(filterSearch){
		this.setState({filterSearch});
	}

	changeStockOnlyFilter(filterStockOnly){
		this.setState({filterStockOnly});
	}

	render() {
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
						<ProductTable headers={["Name", "Price", "Qnt"]}
									products={products} />
					</div>
				</div>
			</div>
		)
	}
}