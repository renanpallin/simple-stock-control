import React from 'react';

import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";


export default class ProductTable extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let rows = [];
		let lastCategory = "";

		this.props.products.forEach(p => {
			if(p.category != lastCategory){
				rows.push(<ProductCategoryRow category={p.category} key={"category-" + p.category} />);
				lastCategory = p.category;
			}

			rows.push(<ProductRow product={p} key={p.name}/>);
		});

		return(
			<table className="table table-sm">
				<thead>
					<tr>
						<th><strong>Name</strong></th>
						<th><strong>Price</strong></th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}
}