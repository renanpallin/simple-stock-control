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
				<h1>Admin</h1>
				{this.props.children}
			</div>
		)
	}
}