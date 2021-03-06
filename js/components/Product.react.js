import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import shallowCompare from 'react-addons-shallow-compare';

class Product extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		var shouldUpdate = shallowCompare(this, nextProps, nextState);
		//todo: remove and refactor to one line
		console.log('product', shouldUpdate);
		return shouldUpdate;
	}

	// Add item to cart via Actions
	addToCart(selected) {
		var sku = selected.sku;
		var update = {
			name: this.props.product.get('name'),
			type: selected.type,
			price: selected.price,
		};
		CartActions.addToCart(sku, update);
	}
	// Select product variation via Actions
	selectVariant(event) {
		CartActions.selectProduct({
			productId: this.props.id,
			index: event.target.value
		});
	}

	render() {
		var selectedIndex = this.props.selectedIndex
		var product = this.props.product.toJS();
		var selected = product.variants[selectedIndex];

		return (
			/*jshint ignore:start */
			<div className="product">
				<div className="product-detail test">
					<h1 className="name">{product.name}</h1>
					<p className="description">{product.description}</p>
					<p className="price">Price: ${selected.price}</p>
					<select onChange={this.selectVariant.bind(this)} value={selectedIndex}>
						{product.variants.map(function(variant, index){
							return (
								<option key={index} value={index}>{variant.type}</option>
							)
						})}
					</select>
					<button type="button" onClick={this.addToCart.bind(this, selected)}>
						Add to cart
					</button>
				</div>
			</div>
			/*jshint ignore:end */
		);
	}
};

export default Product;
