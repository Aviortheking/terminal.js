var gulp = require('gulp');
var gutil = require('gutil');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var coffee = require('gulp-coffee');
var combiner = require('stream-combiner2');
var uglifyhtml = require('gulp-html-minifier');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

paths = {
	dest: "out/"
}

gulp.task('pug', function(done){
	var res = combiner.obj([
		gulp.src('src/pug/*.pug'),
		pug(),
		uglifyhtml({collapseWhitespace: true}),
		gulp.dest(paths.dest)
	]);

	res.on('error', gutil.log);
	browserSync.reload();
	done();
	return res;
});

gulp.task('sass', function(done){
	var res = combiner.obj([
		gulp.src('src/sass/**/*.sass'),
		sass({outputStyle: 'compressed'}),
		autoprefixer({
			cascade: false
		}),
		gulp.dest(paths.dest),
		browserSync.stream()
	]);
	res.on('error', gutil.log);
	done();
	return res;
});


gulp.task('coffee', function(done){
	var res = combiner.obj([
		gulp.src('src/coffee/**/*.coffee'),
		coffee({
			bare: true
		}),
		babel({
			presets: ['@babel/env'],
			sourceType: "unambiguous"
		}),
		gulp.dest(paths.dest + "js/")
	]);
	res.on('error', gutil.log);
	browserSync.reload();
	done();
	return res;

	//return gulp.src('src/coffee/**/*')
	/*	.pipe(sourcemaps.init())
		.pipe(coffee())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('build/js'))*/
});

gulp.task('build', gulp.parallel('pug', 'sass', 'coffee'));

gulp.task('default', gulp.series('build', function() {
	browserSync.init({
		server: {
			baseDir: paths.dest
		}
	});
	gulp.watch("src/pug/**/*", gulp.series('pug'));
	gulp.watch("src/coffee/**/*", gulp.series('coffee'));
	gulp.watch("src/sass/**/*", gulp.series('sass'));
}));

gulp.task('stop', function() {
	process.exit();
});
