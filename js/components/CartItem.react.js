import React, {Component} from 'react';
import CartActions from '../actions/CartActions';

class CartItem extends Component {
	toggleSelection() {
		CartActions.selectCartItem(this.props.sku);
	}

	// Remove item from Cart via Actions
	removeFromCart(){
		CartActions.removeFromCart(this.props.sku);
	}

	quantityChange (event) {
		CartActions.quanitytyChange(this.props.sku, event.target.value);
	}

	render() {
		var product = this.props.itemdata.toJS();
		var sku = this.props.sku;
		var self = this;

		return (
			/*jshint ignore:start */
			<li>
				<h1 className="name"><label><input	type="checkbox" checked={product.selected} onChange={self.toggleSelection.bind(self)}/>{product.name}</label></h1>
				<p className="type">{product.type} x <input className="quantity" type="text" value={product.quantity} onChange={this.quantityChange.bind(self)} /></p>
				<p className="price">${(product.price * product.quantity).toFixed(2)}</p>
				<button type="button" className="remove-item" onClick={self.removeFromCart.bind(self)}>Remove</button>
			</li>
			/*jshint ignore:end */
		);
	}
};


export default CartItem;
