import React from 'react';

export default class ProductCategoryRow extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<tr>
				<td colSpan="2" className="table-info">
					{this.props.category}
				</td>
			</tr>
		)
	}
}