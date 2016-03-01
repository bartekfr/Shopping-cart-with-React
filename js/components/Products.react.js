import React, {Component} from 'react';
import CartActions from '../actions/CartActions';
import Product  from './Product.react';
import ProductsStore from '../stores/ProductsStore';
import CartStore from '../stores/CartStore';


class Products extends Component {
	constructor() {
		super(...arguments);
		this.state = ProductsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		ProductsStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		ProductsStore.removeChangeListener(this.onChange);
	}

	onChange () {
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