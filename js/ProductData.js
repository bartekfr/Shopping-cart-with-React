module.exports = {
	// Load Mock Product Data Into localStorage
	init: function() {
		localStorage.clear();
		localStorage.setItem('product', JSON.stringify([
			{
				id: 'b-001',
				name: 'ReactJS book',
				description: 'First reactJS book',
				variants: [
					{
						sku: 'b-001-print',
						type: 'print version',
						price: 39,

					},
					{
						sku: 'b-001-pdf',
						type: 'e-book',
						price: 29,
					}
				]
			},
			{
				id: 'b-002',
				name: 'CSS book',
				description: 'css bookk',
				variants: [
					{
						sku: 'b-002-print',
						type: 'print version',
						price: 19,

					},
					{
						sku: 'b-002-pdf',
						type: 'e-book',
						price: 9,
					}
				]
			}
		]));
	}

};