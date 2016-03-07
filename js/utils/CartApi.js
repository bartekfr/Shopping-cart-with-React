import CartActions from '../actions/CartActions';

export default{
	getProductData: function() {
		var data = JSON.parse(localStorage.getItem('product'));
		CartActions.receiveProduct(data);
	}
};
