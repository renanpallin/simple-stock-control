import React from 'react';
import ProductRow from './ProductRow';

export default class AddProduct extends React.Component {
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		this.props.addEmptyProduct();
	}

	render() {
		let addButtonStyle = {
			width: "100%"
		}

		return (
			<tr>
				<td></td>
				<td colSpan={this.props.scheme.length -1}>
					<button className="btn btn-secondary"
							style={addButtonStyle}
						    onClick={this.handleClick}>ADD</button>
				</td>
			</tr>
		)
	}
	// render(){
	// 	return (
	// 		<ProductRow isAdmin={this.props.isAdmin}
	// 			changeProduct={this.props.changeProduct}
	// 			scheme={this.props.scheme}
	// 			product={this.props.emptyProduct} 
	// 			 />
	// 	)
	// }
}