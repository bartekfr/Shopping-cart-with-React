var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');
import { List, Map } from 'immutable';

let _products = List();
let _productsSelection = Map();

function loadProductData(data) {
	_products = _products.merge(data);
}

function setSelected(data) {
	_productsSelection = _productsSelection.set(data.product, data.index);
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductsStore = _.extend({}, EventEmitter.prototype, {
	getState: function() {
		return {
			products: _products,
			selected: _productsSelection
		}
	},
	emitChange: function() {
		this.emit('change');
	},
	addChangeListener: function(callback, x) {
		this.on('change', callback);
	},
});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case CartConstants.RECEIVE_DATA:
			loadProductData(action.data);
			break;
		case CartConstants.SELECT_PRODUCT:
			setSelected(action.data);
			break;
		default:
			return true;
	}

	ProductsStore.emitChange();

	return true;

});

module.exports = ProductsStore;
