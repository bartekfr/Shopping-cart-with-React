import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import cartStore from '../stores/CartStore';
import CartItem from './CartItem.react';
import shallowCompare from 'react-addons-shallow-compare';

class Cart extends Component {
	constructor() {
		super(...arguments);
		this.state = cartStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		var shouldUpdate = shallowCompare(this, nextProps, nextState);
		//todo: remove and refactor to one line
		console.log('cart', shouldUpdate);
		return shouldUpdate;
	}

	componentDidMount() {
		cartStore.addChangeListener(this.onChange);
	}

	onChange() {
		this.setState(cartStore.getState());
	}

	closeCart(){
		CartActions.updateCartVisible(false);
	}

	openCart(){
		CartActions.updateCartVisible(true);
	}

	removeSelected() {
		CartActions.removeSelected();
	}

	render() {
		var self = this;
		var products = this.state.items;
		var productsJS = products.toJS();
		var removeLinkClass = this.state.selectedCount ? "" : "hidden";
		var visible = this.state.visible && this.state.count;

		return (
			/*jshint ignore:start */
			<div className={"cart " + (visible ? 'active' : '')}>
				<div className="mini-cart">
					<button type="button" className="close-cart" onClick={this.closeCart.bind(this)}>x</button>
					<ul>
						{Object.keys(productsJS).map(sku => {
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
