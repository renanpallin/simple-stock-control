import React from 'react';

import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";


export default class ProductTable extends React.Component {
	constructor(props){
		super(props);
	}

	renderTHeads(titles){
		return titles.map(title => <th key={title}>
			<strong>{title}</strong>
		</th>)
	}

	render(){
		let tHeads = this.renderTHeads(this.props.headers);

		let rows = [];
		let lastCategory = "";

		this.props.products.forEach(p => {
			if(p.category != lastCategory){
				rows.push(<ProductCategoryRow 
							category={p.category}
							key={"category-" + p.category} 
							colSpan={tHeads.length}/>);
				lastCategory = p.category;
			}

			rows.push(<ProductRow product={p} key={p.name}/>);
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