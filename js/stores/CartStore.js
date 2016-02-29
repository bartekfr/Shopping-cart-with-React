var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CartConstants = require('../constants/CartConstants');
var _ = require('underscore');
import { List, Map } from 'immutable';

let _products = Map();
let _cartVisible = false;

function add(sku, update) {
	update.quantity = _products.get(sku) ?_products.getIn([sku, 'quantity']) + 1 : 1;
	var imUpdate = Map(update);
	_products = _products.set(sku, imUpdate);
}

function setCartVisible(cartVisible) {
	_cartVisible = cartVisible;
}

function removeItem(sku) {
	_products = _products.delete(sku);
}

function selectItem(sku) {
	var selected = _products.getIn([sku, 'selected']);
	if (selected) {
		_products = _products.setIn([sku, 'selected'], false);
	} else {
		_products = _products.setIn([sku, 'selected'], true);
	}
}

function getSelectedItems() {
	var selectedItems = [];
	_products.map((product, sku) => {
		var productJS = product.toJS();
		var selected = productJS.selected;
		if (selected) {
			selectedItems.push(sku);
		}
	});
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
		return Object.keys(_products.toJS()).length;
	},
	getSelectedCount: function() {
		return getSelectedItems().length;
	},
	getCartTotal: function() {
		var total = 0;
		_products.map(product => {
			total += product.get('price') * product.get('quantity');

		});
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
