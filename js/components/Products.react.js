import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import Product  from './Product.react';
import ProductsStore from '../stores/ProductsStore';
import CartStore from '../stores/CartStore';


class Products extends Component {
	constructor() {
		super(...arguments);
		this.state = ProductsStore.getState();
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		ProductsStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		ProductsStore.removeChangeListener(this._onChange);
	}

	_onChange () {
		this.setState(ProductsStore.getState());
	}

	render() {
		var self = this;
		/*jshint ignore:start */
		return (<div className="nodes">{
			this.state.products.map(product => {
				var id = product.get('id');
				var selectedIndex = self.state.selected.get(id) || 0;
				return <Product product={product} key={id} id={id} selectedIndex={selectedIndex} />;
			})
		}</div>);
		/*jshint ignore:end */
	}
}


export default Products;