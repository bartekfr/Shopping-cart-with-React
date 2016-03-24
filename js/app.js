import React, {Component} from 'react';
import CartAPI  from './utils/CartAPI';
import CartApp from './components/CartApp.react';
import ReactDOM  from "react-dom";

ReactDOM.render(
	/*jshint ignore:start */
	<CartApp />,
	document.getElementById('cart')
	/*jshint ignore:end */
);