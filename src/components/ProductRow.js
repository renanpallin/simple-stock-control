import React from 'react';

export default class ProductRow extends React.Component {
	constructor(props){
		super(props);
		this.handleClickInTr = this.handleClickInTr.bind(this);
	}

	handleClickInTr(e){
		this.props.handleClick(parseInt(e.target.dataset.itemId));
	}

	renderButton(key){
		// console.log(key)
		return (
			<td key={key}>
				<button
					className={"btn " + (this.props.product.quantity > 0 ? "btn-info": "disabled")}
					data-item-id={this.props.product.id} 
					onClick={this.handleClickInTr}>Buy!</button>
			</td>
		)
	}

	render(){
		let {schemaArray} = this.props;
		console.log()

		let rows = schemaArray.map((s, i) => {
			let productFieldValue = this.props.product[s.productField];
			if (s.productField === "buy"){
				return (this.renderButton(s.productField + this.props.product.id + "-" + i));
			}
			return <td key={this.props.product.id + "-" + productFieldValue + "-" + i}>{productFieldValue}</td>
		})

		return (
			<tr>
				{rows}
			</tr>
		)
	}
}

// key={ this. + '-' +this.props.product.name}