window.React = require('react');
var ProductData = require('./ProductData');
var CartAPI = require('./utils/CartAPI');
var CartApp = require('./components/CartApp.react');

// Load Mock Product Data into localStorage
ProductData.init();

// Load Mock API Call
CartAPI.getProductData();

React.render(
	/*jshint ignore:start */
	<CartApp />,
	document.getElementById('cart')
	/*jshint ignore:end */
);