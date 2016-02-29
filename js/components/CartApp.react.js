import React, {Component} from 'react';
import Products from './Products.react';
import Cart from './Cart.react';

class CartApp extends Component {
	shouldComponentUpdate() {
		//component have no state not props so no need to re-render
		return false;
	}

	render() {
		return (
			/*jshint ignore:start */
			<div className="cart-app">
				<Cart />
				<Products />
			</div>
			/*jshint ignore:end */
		);
	}
};


export default CartApp;
