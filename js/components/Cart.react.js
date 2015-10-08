var React = require('react');
var CartActions = require('../actions/CartActions');
var CartStore = require('../stores/CartStore');

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
	// Remove item from Cart via Actions
	removeFromCart: function(sku){
		CartActions.removeFromCart(sku);
	},
	removeSelected: function() {
		CartActions.removeSelected();
	},
	toggleSelection: function(sku) {
		CartActions.selectCartItem(sku);
	},
	render: function() {
		var self = this, products = this.state.cartItems;
		var removeLinkClass = this.state.selectedCount ? "" : "hidden";
		var visible = this.state.visible && this.state.count;
		return (
			/*jshint ignore:start */
			<div className={"cart " + (visible ? 'active' : '')}>
				<div className="mini-cart">
					<button type="button" className="close-cart" onClick={this.closeCart}>x</button>
					<ul>
						{Object.keys(products).map(function(sku, ob){
							return (
								<li key={sku}>
									<h1 className="name"><input	type="checkbox" checked={products[sku].selected} onChange={self.toggleSelection.bind(self, sku)}/>{products[sku].name}</h1>
									<p className="type">{products[sku].type} x {products[sku].quantity}</p>
									<p className="price">${(products[sku].price * products[sku].quantity).toFixed(2)}</p>
									<button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, sku)}>Remove</button>
								</li>
							)
						})}
					</ul>
					<a href="#" className={removeLinkClass} onClick={this.removeSelected}>Delete selected items</a>
					<span className="total">Total: ${this.state.total}</span>
				</div>
				<button type="button" className="view-cart" onClick={this.openCart} disabled={Object.keys(this.state.cartItems).length > 0 ? "" : "disabled"}>View Cart ({this.state.count})</button>
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = Cart;
