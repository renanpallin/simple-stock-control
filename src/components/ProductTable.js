import React from 'react';

import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";
import AddProduct from "./AddProduct";


export default class ProductTable extends React.Component {
	constructor(props){
		super(props);
		this.handleRowClickBuy = this.handleRowClickBuy.bind(this);
		this.handleProductChange = this.handleProductChange.bind(this);
	}

	handleProductChange(update, callback){
		this.props.adminChangeProductValue(update, callback);
	}

	handleRowClickBuy(itemId){
		this.props.handleBuy(itemId);
	}

	renderTHeads(titles){
		let THeadStyle = {
			textAlign: "center"
		}

		return titles.map((title, i) => <th key={title + '-' + i} style={THeadStyle}>
			<strong>{title}</strong>
		</th>)
	}

	render(){
		let tHeads = this.renderTHeads(this.props.scheme.map(s => s.header));

		let rows = [];
		let lastCategory = "";

		this.props.products.forEach((p, i) => {
			if(p.category != lastCategory){
				rows.push(<ProductCategoryRow 
							category={p.category}
							key={"category-" + p.category + i} 
							colSpan={tHeads.length + 1 }/>);
				lastCategory = p.category;
			}

			rows.push(<ProductRow 
						isAdmin={this.props.isAdmin}
						changeProduct={this.handleProductChange}
						scheme={this.props.scheme}
						handleClick={this.handleRowClickBuy}
						product={p} 
						key={p.id}/>); //Tinha colocado p.name, quando atualiva o nome, ele trocava o input...
									//Nunca use algo que você pode atualizar
		});

		if(this.props.isAdmin){
			//TIRAR SSASPOHA TUDO DO ADDPRODUCT
			rows.push(<AddProduct
						key="empty-product"
						scheme={this.props.scheme}
						addEmptyProduct={this.props.addEmptyProduct} />)
		}

				
				
				

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