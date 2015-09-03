var AppDispatcher = require('../dispatcher/AppDispatcher');
var CartConstants = require('../constants/CartConstants');

// Define actions object
var CartActions = {
	// Receive inital product data
	receiveProduct: function(data) {
		AppDispatcher.handleAction({
			actionType: CartConstants.RECEIVE_DATA,
			data: data
		});
	},
	// Set currently selected product variation
	selectProduct: function(data) {
		AppDispatcher.handleAction({
			actionType: CartConstants.SELECT_PRODUCT,
			data: data
		});
	},
	// Add item to cart
	addToCart: function(sku, update) {
		AppDispatcher.handleAction({
			actionType: CartConstants.CART_ADD,
			sku: sku,
			update: update
		});
	},
	// Remove item from cart
	removeFromCart: function(sku) {
		AppDispatcher.handleAction({
			actionType: CartConstants.CART_REMOVE,
			sku: sku
		});
	},
	// Update cart visibility status
	updateCartVisible: function(cartVisible) {
		AppDispatcher.handleAction({
			actionType: CartConstants.CART_VISIBLE,
			cartVisible: cartVisible
		});
	}
};

module.exports = CartActions;
