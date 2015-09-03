var React = require('react');
var CartActions = require('../actions/CartActions');
var CartStore = require('../stores/CartStore');

function getCartState() {
	return {
		cartItems: CartStore.getCartItems(),
		count: CartStore.getCartCount(),
		total: CartStore.getCartTotal(),
		visible: CartStore.getCartVisible()
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
	render: function() {
		var self = this, products = this.state.cartItems;
		return (
			/*jshint ignore:start */
			<div className={"cart " + (this.state.visible ? 'active' : '')}>
				<div className="mini-cart">
					<button type="button" className="close-cart" onClick={this.closeCart}>x</button>
					<ul>
						{Object.keys(products).map(function(product){
							return (
								<li key={product}>
									<h1 className="name">{products[product].name}</h1>
									<p className="type">{products[product].type} x {products[product].quantity}</p>
									<p className="price">${(products[product].price * products[product].quantity).toFixed(2)}</p>
									<button type="button" className="remove-item" onClick={self.removeFromCart.bind(self, product)}>Remove</button>
								</li>
							)
						})}
					</ul>
					<span className="total">Total: ${this.state.total}</span>
				</div>
				<button type="button" className="view-cart" onClick={this.openCart} disabled={Object.keys(this.state.cartItems).length > 0 ? "" : "disabled"}>View Cart ({this.state.count})</button>
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = Cart;
