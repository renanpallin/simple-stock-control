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
			  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
			  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
			  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
			  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
			  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
			  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
			],
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
		this.setState({filterStockOnly}, x => console.log(this.state));
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
				(this.state.filterStockOnly ? p.stocked === true : true)
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
						<ProductTable products={products} />
					</div>
				</div>
			</div>
		)
	}
}