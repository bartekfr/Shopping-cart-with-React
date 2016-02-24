import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import CartStore from '../stores/CartStore';


class Product extends Component {
	// Add item to cart via Actions
	addToCart(selected) {
		var sku = selected.sku;
		var update = {
			name: this.props.product.name,
			type: selected.type,
			price: selected.price,
			selected: selected.selected
		};
		CartActions.addToCart(sku, update);
		CartActions.updateCartVisible(true);
	}
	// Select product variation via Actions
	selectVariant(event) {
		CartActions.selectProduct({
			product: this.props.product,
			index: event.target.value
		});
	}

	render() {
		var selectedIndex = this.props.selectedIndex || 0;
		var selected = this.props.product.variants[selectedIndex];
		return (
			/*jshint ignore:start */
			<div className="product">
				<div className="product-detail test">
					<h1 className="name">{this.props.product.name}</h1>
					<p className="description">{this.props.product.description}</p>
					<p className="price">Price: ${selected.price}</p>
					<select onChange={this.selectVariant.bind(this)}>
						{this.props.product.variants.map(function(variant, index){
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
