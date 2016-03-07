import React, {Component} from 'react';
import ProductData from './ProductData';
import CartAPI  from './utils/CartAPI';
import CartApp from './components/CartApp.react';
import ReactDOM  from "react-dom";

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