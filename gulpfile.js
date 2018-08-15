var gulp = require('gulp'),
	browserify = require('browserify'),
	vinyl_source = require('vinyl-source-stream'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	babelify = require('babelify'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	streamify = require('gulp-streamify');

gulp.task('default', ['styles', 'html', 'js', 'images', 'sw']), function() {


};


gulp.task('clean', function() {
	return del(['./test', './build']);
});

gulp.task('html', function() {
	gulp.src('./assets/*.html')
		.pipe(gulp.dest('./test'));
});

gulp.task('styles', function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(concat('styles.css'))
		//.pipe(streamify(uglify()))
		.pipe(gulp.dest('./test/css'));
});

gulp.task('sw', function() {
	return browserify('./assets/sw.js')
		.transform(babelify, {presets: ['env']})
		.bundle()
		.pipe(vinyl_source('sw.js'))
		//.pipe(streamify(uglify()))
		.pipe(gulp.dest('./test'));
});

gulp.task('images', function() {
	gulp.src('./assets/img/**/*.jpg')
		//TODO imagemin, lazyload
		.pipe(gulp.dest('./test/img'));
});


 gulp.task('js', function() {
	var files = [
		'dbhelper.js',
		'main.js',
		'restaurant_info.js'
			];
	function jss(file) {
//		return browserify('./assets/js/dbhelper.js', './assets/js/main.js', './assets/js/restaurant_info.js')
		return browserify(`./assets/js/${file}`)
		.transform(babelify, {presets: ['env']})
		.bundle()
		.pipe(vinyl_source(file))
		//.pipe(streamify(uglify()))
		.pipe(gulp.dest('./test/js'));

	};
	jss(files[0]);
	jss(files[1]);
	jss(files[2]);
});
/*
gulp.task('js', function() {
		gulp.src('./assets/js/*.js')
		.pipe(babel({presets: ['env']}))
		.pipe(gulp.dest('./test/js/'));
});
*/