module.exports =  {
	entry: __dirname + "/js/app.js",
	output: {
		path: __dirname + '/dist',
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			loader: 'babel',
			test: /\.js/,
			query: {
				presets: ['es2015', 'react']
			}
		}]
	}
}