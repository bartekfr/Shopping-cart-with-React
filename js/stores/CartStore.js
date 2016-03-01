import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import CartConstants from '../constants/CartConstants';
import {List, Map} from 'immutable';

let _products = Map();
let _cartVisible = false;

function add(sku, update) {
	update.quantity = _products.get(sku) ?_products.getIn([sku, 'quantity']) + 1 : 1;
	var imUpdate = Map(update);
	_products = _products.set(sku, imUpdate);
	_cartVisible = true;
}

function setCartVisible(cartVisible) {
	_cartVisible = cartVisible;
}

function removeItem(sku) {
	_products = _products.delete(sku);
}

function selectItem(sku) {
	var selected = _products.getIn([sku, 'selected']);
	_products = _products.setIn([sku, 'selected'], !selected);
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
class CartStore extends EventEmitter {
	getCartItems() {
		return _products;
	}

	getCartCount() {
		return Object.keys(_products.toJS()).length;
	}

	getSelectedCount() {
		return getSelectedItems().length;
	}

	getCartTotal() {
		var total = 0;
		_products.map(product => {
			total += product.get('price') * product.get('quantity');

		});
		return total.toFixed(2);
	}

	getCartVisible() {
		return _cartVisible;
	}

	emitChange() {
		this.emit('change');
	}

	addChangeListener(callback) {
		this.on('change', callback);
	}

	removeChangeListener(callback) {
		this.removeListener('change', callback);
	}

}

let cartStore = new CartStore();

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
	cartStore.emitChange();

	return true;

});

export default cartStore;
