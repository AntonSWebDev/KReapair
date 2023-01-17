const { src, dest, watch, parallel, series } = require('gulp');

const scss 					= require('gulp-sass')(require('sass'));
const concat 				= require('gulp-concat');
const browserSync		= require('browser-sync').create();
const uglify 				= require('gulp-uglify-es').default;
const autoprefixer	= require('gulp-autoprefixer');
const imagemin			= require('gulp-imagemin');
const del 					= require('del');

function browsersync() {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
}

function cleanDist() {
	return del('dist')
}

function styles() {
	return src('app/scss/main.scss')
		.pipe(scss({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 10 version'],
			grid: true
		}))
		.pipe(concat('style.min.css'))
		.pipe(dest('app/css'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src('app/js/main.js')
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(dest('app/js'))
		.pipe(browserSync.stream())
}

function images() {
	return src('app/img/**/*')
		.pipe(imagemin(
				[
					imagemin.gifsicle({interlaced: true}),
					imagemin.mozjpeg({quality: 75, progressive: true}),
					imagemin.optipng({optimizationLevel: 5}),
					imagemin.svgo({
						plugins: [
							{removeViewBox: true},
							{cleanupIDs: false}
						]
					})
				]
			))
		.pipe(dest('dist/img'))
}

function watching() {
	watch(['app/scss/**/*.scss'], styles);
	watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
	watch(['app/*.html']).on('change', browserSync.reload);
}

function build() {
	return src([
			'app/fonts/**/*',
			'app/*.html',
			'app/css/style.min.css',
			'app/js/**/*.js', '!app/js/main.js',
			'app/videos/**'
		], {base: 'app'})
	.pipe(dest('dist'))
}

exports.styles 			= styles; 
exports.watching		= watching;
exports.browsersync = browsersync;
exports.scripts 		= scripts;
exports.images 			= images;
exports.cleanDist 	= cleanDist;

exports.build 			= series (cleanDist, images, build);
exports.default 		= parallel(styles, scripts, browsersync, watching);