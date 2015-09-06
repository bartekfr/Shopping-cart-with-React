var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');


gulp.task('jshint', function() {
	return gulp.src(['./js/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});


function browserifyShare(watch){
	var b = browserify({
		entries: './js/app.js',
		cache: {},
		debug: true,
		packageCache: {},
		transform: [reactify],
		fullPaths: true
	});
	if (watch) {
		b = watchify(b);
	}
	b.on('update', function(changedFiles){
 		gulp.src(changedFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

		bundleShare(b);
	});

	bundleShare(b);
}

function bundleShare(b) {
	console.log("bundling");
	return b.bundle()
	.on('error', gutil.log.bind(gutil, 'Browserify Error'))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./dist'));
}


gulp.task('watch', ['jshint'], function() {
	browserifyShare(true);
});

gulp.task('default', ['jshint'], function() {
	 browserifyShare();
});

