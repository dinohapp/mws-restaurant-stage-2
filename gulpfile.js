var gulp = require('gulp'),
	webpack = require('webpack-stream'),
	vinyl_source = require('vinyl-source-stream'),
	del = require('del'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	babelify = require('babelify'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	streamify = require('gulp-streamify');

gulp.task('default', ['styles', 'html', 'js', 'images', 'sw', 'manifest']), function() {


};


gulp.task('clean', function() {
	return del(['./test', './build']);
});

gulp.task('html', function() {
	gulp.src('./assets/*.html')
		.pipe(gulp.dest('./test'));
});

gulp.task('manifest', function() {
	gulp.src('./assets/manifest.json')
		.pipe(gulp.dest('./test'));
});

//copy favicon.ico too

gulp.task('styles', function() {
	gulp.src('./assets/css/**/*.css')
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(concat('styles.css'))
//		.pipe(streamify(uglify()))
		.pipe(gulp.dest('./test/css'));
});

gulp.task('sw', function() {
		gulp.src([`./assets/sw.js`])
		.pipe(webpack({
			mode: 'production',
			output: {filename: 'sw.js'}
		}))
		.pipe(gulp.dest('./test'));
});

gulp.task('images', function() {
	gulp.src('./assets/img/**/*.*')
		//TODO imagemin, lazyload
		.pipe(gulp.dest('./test/img'));
});


/* gulp.task('js', function() {
	var files = [
		'dbhelper.js',
		'main.js',
		'restaurant_info.js'
			];
	function jss(file) {
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
*/

gulp.task('js', function() {
		gulp.src('./assets/js/*.js')
		.pipe(babel({presets: ['env']}))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('./test/js/'));
});
