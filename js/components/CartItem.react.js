import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import _  from '../../node_modules/underscore';

class CartItem extends Component {
	toggleSelection(sku) {
		CartActions.selectCartItem(sku);
	}

	// Remove item from Cart via Actions
	removeFromCart(sku){
		CartActions.removeFromCart(sku);
	}

	render() {
		var product = this.props.itemdata.toJS();
		var sku = this.props.sku;
		var self = this;

		return (
			/*jshint ignore:start */
			<li>
				<h1 className="name"><input	type="checkbox" checked={product.selected} onChange={self.toggleSelection.bind(self, sku)}/>{product.name}</h1>
				<p className="type">{product.type} x {product.quantity}</p>
				<p className="price">${(product.price * product.quantity).toFixed(2)}</p>
				<button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, sku)}>Remove</button>
			</li>
			/*jshint ignore:end */
		);
	}
};


export default CartItem;
