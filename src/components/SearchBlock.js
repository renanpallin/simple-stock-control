import React from 'react';

export default class SearchBlock extends React.Component {
	constructor(props){
		super(props);

		this.handleChangeInput = this.handleChangeInput.bind(this)
	}

	handleChangeInput(e){
		this.props.changeSearchFilter(e.target.value);
	}

	handleChangeCheck(e){
		console.log('check', e.target.checked);
		this.props.changeStockOnlyFilter(e.target.checked);
	}

	render(){
		return(
			<div>
				<input type="text"
					   className="form-control"
					   placeholder="Search..." 
					   value={this.props.search} 
					   onChange={this.handleChangeInput.bind(this)} />
				<label htmlFor="checkIsStockOnly" className="form-check-label">
					<input type="checkbox"
						   className="form-check-input" 
						   id="checkIsStockOnly"
						   checked={this.props.stockOnly}
						   onChange={this.handleChangeCheck.bind(this)}/>
					Show only products in stock
				</label>
			</div>
		)
	}
}