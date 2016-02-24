import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import Product  from './Product.react';
import ProductsStore from '../stores/ProductsStore';
import CartStore from '../stores/CartStore';


class Products extends Component {
	constructor() {
		super(...arguments);
		this.state = this.getProductsState();
		this._onChange = this._onChange.bind(this);
	}

	getProductsState() {
		return {
			products: ProductsStore.getProducts(),
			selectedProducts: ProductsStore.getSelected()
		};
	}
	componentDidMount() {
		ProductsStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		ProductsStore.removeChangeListener(this._onChange);
	}

	_onChange () {
		this.setState(this.getProductsState());
	}

	render() {
		var self = this;
		/*jshint ignore:start */
		var nodes = this.state.products.map(function(product){
			var id = product.id;
			var selectedIndex = self.state.selectedProducts[id] || 0;
			return <Product product={product} key={id} id={id} selectedIndex={selectedIndex} />;
		});
		return (<div className="nodes">{nodes}</div>);
		/*jshint ignore:end */
	}
}


export default Products;