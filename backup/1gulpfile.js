var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	idb = require('idb'),
	browserSync = require('browser-sync').create(),
	babel = require('gulp-babel');
	watch = require('gulp-watch'),

gulp.task('default', ['styles', 'html', 'js', 'images', 'sw']), function() {


};

gulp.task('bs', function() {
	browserSync.init({
		notify: true,
		server: {
			baseDir: "test"
		}
	});
	 /**browserSync.init({
     server: {
        baseDir: "./public/",
        startPath: "./public/index.html",
        index: "index.html",
        directory: true
     }
   });
	 browserSync.stream();*/
});

gulp.task('clean', function() {
	return del('./test', './build');
});

gulp.task('styles', function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('./test/css'));
});

gulp.task('html', function() {
	gulp.src('./assets/*.html')
		//TODO concat both html files into one
		.pipe(gulp.dest('./test'));
});

gulp.task('js', function() {
	gulp.src('./assets/js/**/*.js')
		//TODO do stuff with js files like babel etc, concat
	    /**webpack(require('./webpack.config.js'), function(err, stats) {
			if (err) {
  				console.log(err.toString());
			}
		console.log(stats.toString());
		callback();
		})*/
		.pipe(babel())
		.pipe(gulp.dest('./test/js'));
});
gulp.task('sw', function() {
	gulp.src('./assets/sw.js')
		//TODO do stuff with sw
		.pipe(gulp.dest('./test'));
});


gulp.task('images', function() {
	gulp.src('./assets/img/**/**.jpg')
		//TODO imagemin, lazyload
		.pipe(gulp.dest('./test/img'));
});