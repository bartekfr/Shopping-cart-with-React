import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import cartStore from '../stores/CartStore';
import CartItem from './CartItem.react';

function getCartState() {
	return {
		cartItems: cartStore.getCartItems(),
		count: cartStore.getCartCount(),
		total: cartStore.getCartTotal(),
		visible: cartStore.getCartVisible(),
		selectedCount: cartStore.getSelectedCount()
	};
}

class Cart extends Component {
	constructor() {
		super(...arguments);
		this.state = getCartState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		cartStore.addChangeListener(this.onChange);
	}

	onChange() {
		this.setState(getCartState());
	}

	closeCart(){
		CartActions.updateCartVisible(false);
	}

	// Show cart via Actions
	openCart(){
		CartActions.updateCartVisible(true);
	}

	removeSelected() {
		CartActions.removeSelected();
	}

	render() {
		var self = this;
		var products = this.state.cartItems;
		var productsJS = products.toJS();
		var removeLinkClass = this.state.selectedCount ? "" : "hidden";
		var visible = this.state.visible && this.state.count;

		return (
			/*jshint ignore:start */
			<div className={"cart " + (visible ? 'active' : '')}>
				<div className="mini-cart">
					<button type="button" className="close-cart" onClick={this.closeCart}>x</button>
					<ul>
						{Object.keys(productsJS).map(function(sku, ob){
							return (
								<CartItem itemdata={products.get(sku)} key={sku} sku={sku} />
							)
						})}
					</ul>
					<a href="#" className={removeLinkClass} onClick={this.removeSelected}>Delete selected items</a>
					<span className="total">Total: ${this.state.total}</span>
				</div>
				<button type="button" className="view-cart" onClick={this.openCart.bind(this)} disabled={this.state.count > 0 ? false : "disabled"}>View Cart ({this.state.count})</button>
			</div>
			/*jshint ignore:end */
		);
	}
};

export default Cart;
