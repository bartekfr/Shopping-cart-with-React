var React = require('react');
var CartActions = require('../actions/CartActions');
var ProductStore = require('../stores/ProductStore');
var CartStore = require('../stores/CartStore');

function getState() {
	var selected = ProductStore.getSelected();
	return {
		selectedIndex: selected.selected,
		updateId: selected.updateId,
	};
}

var Product = React.createClass({
	componentDidMount: function() {
		ProductStore.addChangeListener(this._onChange);
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		if (nextState.updateId !==  this.props.id) {
			return false;
		}
		return true;
	},
	// Add item to cart via Actions
	addToCart: function(selected){
		var sku = selected.sku;
		var update = {
			name: this.props.product.name,
			type: selected.type,
			price: selected.price
		};
		CartActions.addToCart(sku, update);
		CartActions.updateCartVisible(true);
	},
	getInitialState: function() {
		return getState();
	},
	// Select product variation via Actions
	selectVariant: function(event){
		CartActions.selectProduct({
			product: this.props.product,
			index: event.target.value
		});
	},
	_onChange: function(data) {
		if (data.updateId !== this.props.id) {
			return false;
		}
		this.setState(getState());
	},
	render: function() {
		var selected = this.props.product.variants[this.state.selectedIndex];

		return (
			/*jshint ignore:start */
			<div className="product">
				<div className="product-detail test">
					<h1 className="name">{this.props.product.name}</h1>
					<p className="description">{this.props.product.description}</p>
					<p className="price">Price: ${selected.price}</p>
					<select onChange={this.selectVariant}>
						{this.props.product.variants.map(function(variant, index){
							return (
								<option key={index} value={index}>{variant.type}</option>
							)
						})}
					</select>
					<button type="button" onClick={this.addToCart.bind(this, selected)}>
						Add to cart
					</button>
				</div>
			</div>
			/*jshint ignore:end */
		);
	}
});

module.exports = Product;
