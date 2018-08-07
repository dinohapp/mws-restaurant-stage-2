var gulp = require('gulp'),
	browserify = require('browserify'),
	vinyl_source = require('vinyl-source-stream'),
	vinyl_buffer = require('vinyl-buffer'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	babel = require('gulp-babel'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	streamify = require('gulp-streamify');
	//path = require('path');

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
		.pipe(gulp.dest('./test/css'));
});

gulp.task('sw', function() {
	gulp.src('./assets/sw.js')
		.pipe(gulp.dest('./test'));
});

gulp.task('images', function() {
	gulp.src('./assets/img/**/**.jpg')
		//TODO imagemin, lazyload
		.pipe(gulp.dest('./test/img'));
});


gulp.task('js', function() {
		//gulp.src('./assets/js/*.js')
	var jsStream = browserify('./assets/js/main.js').bundle()

//		.pipe(vinyl_source('main.js'))
		//.pipe(streamify(browserify()))
		//.bundle()
		//.transform()

		//.pipe(vinyl_buffer())
		//.pipe(uglify())
		//.pipe(babel())
		//.pipe(gulp.dest('./test/js/all.js'));
});

