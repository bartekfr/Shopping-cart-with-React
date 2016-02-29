window.React = require('react');
var ProductData = require('./ProductData');
var CartAPI = require('./utils/CartAPI');
import CartApp from './components/CartApp.react';
var ReactDOM = require("react-dom");

// Load Mock Product Data into localStorage
ProductData.init();

// Load Mock API Call
CartAPI.getProductData();

ReactDOM.render(
	/*jshint ignore:start */
	<CartApp />,
	document.getElementById('cart')
	/*jshint ignore:end */
);