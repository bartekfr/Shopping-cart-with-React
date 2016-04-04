import CartActions from './actions/CartActions';

let productsData = [
	{
		"id": "b-1",
		"name": "ReactJS book",
		"description": "First reactJS book",
		"variants": [
			{
				"sku": "b-1-print",
				"type": "print version",
				"price": 39
			},
			{
				"sku": "b-1-ebook",
				"type": "e-book",
				"price": 29
			}
		]
	},
	{
		"id": "b-2",
		"name": "CSS book",
		"description": "css bookk",
		"variants": [
			{
				"sku": "b-2-print",
				"type": "print version",
				"price": 19,

			},
			{
				"sku": "b-2-ebook",
				"type": "e-book",
				"price": 9,
			}
		]
	}
];

if (localStorage.getItem('products') === null) {
	localStorage.setItem('products', JSON.stringify(productsData));
} else {
	productsData = JSON.parse(localStorage.getItem('products'))
}

let cartAPI = {
	fetch() {
		//fake async request with Promise API
		var promise = new Promise(function(resolve, reject) {
			setTimeout(function() {
				resolve(productsData);
			}, 200)
		});

		promise.then(function(response) {
			CartActions.loadProductDataSuccess(response);
		});
	},
	addNewProduct(data) {
		//fake backend id generation
		var lastIdNumber = productsData[productsData.length - 1].id.split('-')[1];
		var newIdNumber = ++lastIdNumber;
		var id = 'b-' + newIdNumber;

		data.id = id;
		data.variants[0].sku = id + '-print';
		data.variants[1].sku = id + '-ebook';

		var promise = new Promise(function(resolve, reject) {
			setTimeout(function() {
				productsData.push(data);
				localStorage.setItem('products', JSON.stringify(productsData));
				resolve(data);
			}, 200)
		});

		promise.then(function(response) {
			CartActions.addNewProductSuccess(response);
		});

	}
};

export default cartAPI;


