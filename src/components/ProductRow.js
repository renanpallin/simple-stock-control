import React from 'react';

export default class ProductRow extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<tr>
				<td>{this.props.product.name}</td>
				<td>{this.props.product.price}</td>
				<td>{this.props.product.quantity}</td>
			</tr>
		)
	}
}