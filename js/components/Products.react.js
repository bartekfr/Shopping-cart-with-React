var React = require('react');
var CartActions = require('../actions/CartActions');
var Product = require('./Product.react');
var ProductsStore = require('../stores/ProductsStore');
var CartStore = require('../stores/CartStore');


function getProductsState() {
	return {
		products: ProductsStore.getProducts(),
		cartItems: CartStore.getCartItems()
	};
}

var Products = React.createClass({
	getInitialState: function() {
		return getProductsState();
	},
	componentDidMount: function() {
		ProductsStore.addChangeListener(this._onChange, 55);
	},
	_onChange: function() {
		this.setState(getProductsState());
	},
	render: function() {
		var self = this;
		/*jshint ignore:start */
		var nodes = this.state.products.map(function(product){
			return <Product product={product} key={product.id} id={product.id} cartitems={self.state.cartItems} />;
		});
		return (<div className="nodes">{nodes}</div>);
		/*jshint ignore:end */
	}
});

module.exports = Products;