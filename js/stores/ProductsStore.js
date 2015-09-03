var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');

var _product = {}, _selected = null;

function loadProductData(data) {
	_products = data;
}


// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductsStore = _.extend({}, EventEmitter.prototype, {
	getProducts: function() {
		return _products;
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
		default:
			return true;
	}

	ProductsStore.emitChange();

	return true;

});

module.exports = ProductsStore;
