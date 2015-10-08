var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');

var _products = {}, _cartVisible = false;

function add(sku, update) {
	update.quantity = sku in _products ? _products[sku].quantity + 1 : 1;
	_products[sku] = _.extend({}, update);
}

function setCartVisible(cartVisible) {
	_cartVisible = cartVisible;
}

function removeItem(sku) {
	delete _products[sku];
}

function selectItem(sku) {
	var selected = _products[sku].selected;
	if (selected) {
		_products[sku].selected = false;
	} else {
		_products[sku].selected = true;
	}
}

function getSelectedItems() {
	var selectedItems = [];
	for (var sku in _products) {
		var product = _products[sku];
		var selected = product.selected;
		if (selected) {
			selectedItems.push(sku);
		}
	}
	return selectedItems;
}

function removeSelected() {
	var selectedItems = getSelectedItems();
	selectedItems.forEach(function(v) {
		removeItem(v);
	});
}

// Extend Cart Store with EventEmitter to add eventing capabilities
var CartStore = _.extend({}, EventEmitter.prototype, {
	getCartItems: function() {
		return _products;
	},
	getCartCount: function() {
		return Object.keys(_products).length;
	},
	getSelectedCount: function() {
		return getSelectedItems().length;
	},
	getCartTotal: function() {
		var total = 0;
		for(var product in _products){
			if(_products.hasOwnProperty(product)){
				total += _products[product].price * _products[product].quantity;
			}
		}
		return total.toFixed(2);
	},
	getCartVisible: function() {
		return _cartVisible;
	},
	emitChange: function() {
		this.emit('change');
	},
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}

});

//Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case CartConstants.CART_ADD:
			add(action.sku, action.update);
			break;
		case CartConstants.CART_VISIBLE:
			setCartVisible(action.cartVisible);
			break;
		case CartConstants.CART_REMOVE:
			removeItem(action.sku);
			break;
		case CartConstants.CART_SELECT_ITEM:
			selectItem(action.sku);
			break;
		case CartConstants.CART_REMOVE_SELECTED:
			removeSelected();
			break;
		default:
			return true;
	}

	CartStore.emitChange();

	return true;

});

module.exports = CartStore;
