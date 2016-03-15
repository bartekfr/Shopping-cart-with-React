import AppDispatcher from '../dispatcher/AppDispatcher';
import CartConstants from '../constants/CartConstants';

// Define actions object
let cartActions = {
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
	selectCartItem: function(sku) {
		AppDispatcher.handleAction({
			actionType: CartConstants.CART_SELECT_ITEM,
			sku: sku
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
	removeSelected: function() {
		AppDispatcher.handleAction({
			actionType: CartConstants.CART_REMOVE_SELECTED
		});
	},
	// Update cart visibility status
	updateCartVisible: function(cartVisible) {
		AppDispatcher.handleAction({
			actionType: CartConstants.CART_VISIBLE,
			cartVisible: cartVisible
		});
	},
	quanitytyChange: function(sku, quantity) {
		AppDispatcher.handleAction({
			actionType: CartConstants.CART_QUANTITY,
			sku: sku,
			quantity: quantity
		});
	}
};

export default cartActions;