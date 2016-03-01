import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import CartStore from '../stores/CartStore';
import CartItem from './CartItem.react';

function getCartState() {
	return {
		cartItems: CartStore.getCartItems(),
		count: CartStore.getCartCount(),
		total: CartStore.getCartTotal(),
		visible: CartStore.getCartVisible(),
		selectedCount: CartStore.getSelectedCount()
	};
}

var Cart = React.createClass({
	getInitialState: function() {
		return getCartState();
	},
	componentDidMount: function() {
		CartStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState(getCartState());
	},
	closeCart: function(){
		CartActions.updateCartVisible(false);
	},
	// Show cart via Actions
	openCart: function(){
		CartActions.updateCartVisible(true);
	},
	removeSelected: function() {
		CartActions.removeSelected();
	},
	render: function() {
		var self = this;
		var products = this.state.cartItems;
		var productsJS = products.toJS();
		var removeLinkClass = this.state.selectedCount ? "" : "hidden";
		var visible = this.state.visible && this.state.count;
		return (
			/*jshint ignore:start */
			<div className={"cart " + (visible ? 'active' : '')}>
				<div className="mini-cart">
					<button type="button" className="close-cart" onClick={this.closeCart}>x</button>
					<ul>
						{Object.keys(productsJS).map(function(sku, ob){
							return (
								<CartItem itemdata={products.get(sku)} key={sku} sku={sku} />
							)
						})}
					</ul>
					<a href="#" className={removeLinkClass} onClick={this.removeSelected}>Delete selected items</a>
					<span className="total">Total: ${this.state.total}</span>
				</div>
				<button type="button" className="view-cart" onClick={this.openCart} disabled={productsJS.length > 0 ? "" : "disabled"}>View Cart ({this.state.count})</button>
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = Cart;
