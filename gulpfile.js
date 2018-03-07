"use strict";

let config = {
	outputBase: "dist/",

	cssSource: "src/css/**/*.css",
	mainCss: "src/css/style.css",
	cssOutput: "css/",
	cssName: "style.css",

	scriptsName: "all.js",
  scriptsSource: ['src/scripts/**/*.js'], 
	startScript: "src/scripts/Script.js", // "main" file from which the bundle is created
	scriptsOutput: "scripts/",

	viewsSource: "src/views/**/*.html", 

	imagesSource: "src/images/**/*",
	imagesOutput: "dist/images",

	fontsSource: "src/css/fonts/**/*",
	fontsOutput: "dist/css/fonts",

	debug: false
}

const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const precss = require('precss');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const browserify = require("browserify");
const babel = require("gulp-babel");
const fs = require("fs");
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const del = require("del");
const reload = browserSync.reload;
const minifyCSS = require('gulp-minify-css');
const htmlmin = require('gulp-htmlmin');

gulp.task('css', (cb) => {
	gulp.src(config.mainCss)
		.pipe(gulpif(config.debug, sourcemaps.init()))
		.pipe(plumber())
    .pipe(postcss([ require('precss'), require('autoprefixer') ]) )
    .pipe(minifyCSS())
		.pipe(gulpif(config.debug, sourcemaps.write()))
		.pipe(gulp.dest(config.outputBase + config.cssOutput))
		.pipe(browserSync.stream());
	cb();
});

gulp.task('scripts', () => {
	const fs = require('fs');
	const browserify = require('browserify');
	const buffer = require('vinyl-buffer');
	const source = require('vinyl-source-stream');

	return browserify({
		entries: `${config.startScript}`,
		debug: config.debug
	})
	.transform('babelify', { compact:false, presets: ['es2015'] })
	.bundle()
	.pipe(source(config.scriptsName))
	.pipe(buffer())
	.pipe(gulpif(!config.debug, uglify()))
	.pipe(gulp.dest(config.outputBase + config.scriptsOutput));
});

gulp.task('views', (cb) => {
	return gulp
    .src(config.viewsSource)
    .pipe(htmlmin({ collapseWhitespace:true }))
		.pipe(gulp.dest("dist"))
		.pipe(reload({ stream:true }));
	cb();
});

gulp.task('images', (cb) => {
	gulp.src(config.imagesSource)
		.pipe(gulp.dest(config.imagesOutput))
});

gulp.task('fonts', (cb) => {
	gulp.src(config.fontsSource)
		.pipe(gulp.dest(config.fontsOutput));
});

gulp.task('clean', (cb) => {
	del.sync(config.outputBase);
	cb(); 
});

gulp.task('browser-sync', () => {
	browserSync.init({
	    server: {
	      baseDir: 'dist'
      }
	});
});


gulp.task('watch-css', () => gulp.watch(config.cssSource, ['css']));
gulp.task('watch-scripts', () => gulp.watch(config.scriptsSource, ['scripts']));
gulp.task('watch-views', () => gulp.watch(config.viewsSource, ['views']));
gulp.task('watch-images', () => gulp.watch(config.imagesSource, ['images']));
gulp.task('watch-fonts', () => gulp.watch(config.fontsSource, ['fonts']));

gulp.task('build', ['clean', 'css', 'scripts', 'views', 'images', 'fonts']); 
gulp.task('default', ['clean', 'css', 'scripts', 'views', 'images', 'fonts', 'browser-sync', 'watch-css', 'watch-scripts', 'watch-views', 'watch-images', 'watch-fonts']);



