import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import Product  from './Product.react';
import productsStore from '../stores/ProductsStore';


class Products extends Component {
	constructor() {
		super(...arguments);
		this.state = productsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		CartActions.loadProductData();
		productsStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		productsStore.removeChangeListener(this.onChange);
	}

	onChange () {
		this.setState(productsStore.getState());
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