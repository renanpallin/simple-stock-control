import React from 'react';

export default class ProductRow extends React.Component {
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleAdminChange = this.handleAdminChange.bind(this);
		this.handleAdminOnBlur = this.handleAdminOnBlur.bind(this);
	}

	handleClick(e){
		this.props.handleClick(parseInt(e.target.dataset.itemId));
	}

	handleAdminChange(e){
		e.persist();
		e.target.style.backgroundColor = "yellow";
		let update = {
			itemId: e.target.dataset.itemId,
			field: e.target.dataset.field,
			value: e.target.value
		}

		this.props.changeProduct(update, sucess => {
			console.log("Viou mudar o style agora hem, fica vendo", sucess)
			let {style} = e.target;
			if (!sucess)
				style.backgroundColor = "red";
			else
				style.backgroundColor = "greenyellow";
		});
	}

	handleAdminOnBlur(e){
		let update = {
			itemId: e.target.dataset.itemId,
			field: e.target.dataset.field,
			value: e.target.value	
		}

		this.props.adminRevertUpdate(update, sucess => {
			console.log('callback revert', sucess);
		})
	}

	renderButton(key){
		let buttonStylePullRight = {
			marginLeft: "auto",
			display: "block"
		}

		return (
			<td className="align-middle" key={key}>
				<button
					className={"btn " + (this.props.product.quantity > 0 ? "btn-info": "disabled")}
					style={buttonStylePullRight}
					data-item-id={this.props.product.id} 
					onClick={this.handleClick}>Buy!</button>
			</td>
		)
	}

	render(){
		let {scheme} = this.props;
		console.log()

		let rows = scheme.map((s, i) => {
			let productFieldValue = this.props.product[s.productField];
			if (s.productField === "buy"){
				return (this.renderButton(s.productField + this.props.product.id + "-" + i));
			}

			let adminInput = null;
			if (this.props.isAdmin){
				if(s.productField !== "id"){
					adminInput = <input type="text"
										placeholder={s.productField}
										data-item-id={this.props.product.id}
										data-field={s.productField}
										value={productFieldValue}
										onChange={this.handleAdminChange}
										onBlur={this.handleAdminOnBlur} />
				}

			}

			/* O pior bug que tive neste app:
				Digitava uma letra no admin, atualizava o state,
				mudava na visão do cliente (tabela superior), mas tirava o 
				cursor do input, tendo que clicar novamente e digitar letra
				por letra. O problema era que eu quando atualizava um campo, 
				ele atualiava a parte da chave que era s.productFieldValue e,
				naturalmente, outra chave = outro componente renderizado, o que
				causou o efeito indesejado. Pude perceber tmabém pela ausência 
				do CSS que eu aplico com o e.target.event. Resvoli colocando o nome
				do field para compor a chave no lugar de seu valor.
				NUNCA use algum valor que possa ser atulizado nas chaves.
			 */
			return <td className={"align-middle table-cell-" + s.productField} key={this.props.product.id + "-" + s.productField + "-" + i}>
				{adminInput || productFieldValue}
			</td>
		})

		return (
			<tr>
				{rows}
			</tr>
		)
	}
}

// key={ this. + '-' +this.props.product.name}