import React from 'react';

import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";


export default class ProductTable extends React.Component {
	constructor(props){
		super(props);
		this.handleRowClickBuy = this.handleRowClickBuy.bind(this);
	}

	handleRowClickBuy(itemId){
		this.props.handleBuy(itemId);
	}

	renderTHeads(titles){
		return titles.map((title, i) => <th key={title + '-' + i}>
			<strong>{title}</strong>
		</th>)
	}

	render(){
		let tHeads = this.renderTHeads(this.props.schemaArray.map(s => s.header));

		let rows = [];
		let lastCategory = "";

		this.props.products.forEach(p => {
			if(p.category != lastCategory){
				rows.push(<ProductCategoryRow 
							category={p.category}
							key={"category-" + p.category} 
							colSpan={tHeads.length + 1 }/>);
				lastCategory = p.category;
			}

			rows.push(<ProductRow 
						schemaArray={this.props.schemaArray}
						handleClick={this.handleRowClickBuy}
						product={p} 
						key={p.name}/>);
		});

		return(
			<table className="table table-sm">
				<thead>
					<tr>
						{tHeads}
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}
}