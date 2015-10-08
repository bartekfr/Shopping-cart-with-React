var React = require('react');
var CartActions = require('../actions/CartActions');
var CartStore = require('../stores/CartStore');


var Product = React.createClass({
	// Add item to cart via Actions
	addToCart: function(selected){
		var sku = selected.sku;
		var update = {
			name: this.props.product.name,
			type: selected.type,
			price: selected.price,
			selected: selected.selected
		};
		CartActions.addToCart(sku, update);
		CartActions.updateCartVisible(true);
	},
	// Select product variation via Actions
	selectVariant: function(event){
		CartActions.selectProduct({
			product: this.props.product,
			index: event.target.value
		});
	},
	render: function() {
		var selectedIndex = this.props.selectedIndex || 0;
		var selected = this.props.product.variants[selectedIndex];

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
