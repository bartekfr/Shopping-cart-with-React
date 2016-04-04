import AppDispatcher from'../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import CartConstants from '../constants/CartConstants';
import {List, Map} from 'immutable';

let _products = List();
let _productsSelection = Map();

function loadProductData(data) {
	_products = _products.merge(data);
}

function setSelected(data) {
	_productsSelection = _productsSelection.set(data.productId, data.index);
}

function addNewProduct(data) {
	_products = _products.push(Map(data));
}

class ProductsStore extends EventEmitter {
	getState() {
		return {
			products: _products,
			selected: _productsSelection
		}
	}

	emitChange() {
		this.emit('change');
	}

	addChangeListener(callback) {
		this.on('change', callback);
	}
}

let productsStore = new ProductsStore();

//Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case CartConstants.LOAD_DATA_SUCCESS:
			loadProductData(action.data);
			break;
		case CartConstants.SELECT_PRODUCT:
			setSelected(action.data);
			break;
		case CartConstants.ADD_NEW_PRODUCT_SUCCESS:
			addNewProduct(action.data);
			break;
		default:
			return true;
	}

	productsStore.emitChange();

	return true;

});

export default productsStore;
