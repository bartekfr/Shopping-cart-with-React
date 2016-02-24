var React = require('react');
import Products from './Products.react';
var Cart = require('./Cart.react');

var CartApp = React.createClass({
	render: function() {
		return (
			/*jshint ignore:start */
			<div className="cart-app">
				<Cart />
				<Products />
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = CartApp;
