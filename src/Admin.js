import React from 'react';

export default class Admin extends React.Component {
	constructor(props){
		super(props);
	}

	handleUpdateProduct(e){
		this.props.adminUpdateProduct()
	}
	render(){
		return (
			<div className="admin">
				<h1 style={this.props.barStyle}>Admin</h1>
				{this.props.children}
			</div>
		)
	}
}