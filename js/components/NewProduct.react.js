import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import productsStore from '../stores/ProductsStore';
import shallowCompare from 'react-addons-shallow-compare';

class NewProduct extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		var shouldUpdate = shallowCompare(this, nextProps, nextState);
		//todo: remove and refactor to one line
		console.log('new product', shouldUpdate);
		return shouldUpdate;
	}

	addProduct() {
		var name = this.refs.name.value;
		var description = this.refs.description.value;
		var printPrice = this.refs.printPrice.value;
		var ePrice = this.refs.ePrice.value;

		CartActions.addNewProduct({
			"name": name,
			"description": description,
			"variants": [
				{
					"type": "print version",
					"price": printPrice
				},
				{
					"type": "e-book",
					"price": ePrice
				}
			]
		});

		this.refs.name.value = '';
		this.refs.description.value = '';
		this.refs.printPrice.value = '';
		this.refs.ePrice.value = '';
	}

	render() {
		return (
			/*jshint ignore:start */
			<div className="product">
				<div className="product-detail test">
					<p>
						<input placeholder="Name" type="text" ref="name" />
					</p>
					<p>
						<input placeholder="Description" type="text" ref="description" />
					</p>
					<p>
						<input placeholder="Print price" type="text" ref="printPrice" />
					</p>
					<p>
						<input placeholder="E-book price" type="text" ref="ePrice" />
					</p>
					<button type="button" onClick={this.addProduct.bind(this)}>
						Add new product
					</button>
				</div>
			</div>
			/*jshint ignore:end */
		);
	}
};

export default NewProduct;
