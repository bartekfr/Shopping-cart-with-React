import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import CartConstants from '../constants/CartConstants';
import {List, Map} from 'immutable';

let _cartState = Map();
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

function setQuantity(sku, quantity) {
	quantity = parseInt(quantity, 10);
	_products = _products.setIn([sku, 'quantity'], quantity);
}


// store helper API
function getCartCount() {
	return _products.size;
}

function getSelectedCount() {
	return getSelectedItems().length;
}

function getCartTotal() {
	var total = 0;
	_products.map(product => {
		total += product.get('price') * product.get('quantity');

	});
	return total.toFixed(2);
}

function getCartVisible() {
	return _cartVisible;
}

function getCartItems() {
	return _products;
}

class CartStore extends EventEmitter {
	getState() {
		_cartState = _cartState.withMutations(state => {
			state.set('items', _products).set('visible', _cartVisible);
		});

		return {
			fullState: _cartState,
			items: getCartItems(),
			count: getCartCount(),
			visible: getCartVisible(),
			selectedCount: getSelectedCount(),
			total: getCartTotal()
		};
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
		case CartConstants.CART_QUANTITY:
			setQuantity(action.sku, action.quantity);
			break;
		default:
			return true;
	}
	cartStore.emitChange();

	return true;

});

export default cartStore;
