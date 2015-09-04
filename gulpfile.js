var gulp = require('gulp'),
    bower = require('gulp-bower'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    frontMatter = require('gulp-front-matter'),
    rename = require('gulp-rename'),
    hb = require('gulp-hb'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    uncss = require('gulp-uncss'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    _ = require('lodash');

gulp.task('default', function () {

    return runSequence('clean',
        ['copy', 'handlebars', 'uglify:aboveTheFold', 'uglify:finishing'],
        'less',
        'watch',
        'browserSync');

});

gulp.task('handlebars', function () {
    return gulp.src('./src/**.hbs')
        .pipe(rename({
            extname: ".html"
        }))
        .pipe(frontMatter({ // optional configuration
            property: 'frontMatter', // property added to file object
            remove: true // should we remove front-matter header?
        }))
        .pipe(hb({
            debug: true,
            bustCache: true,
            data: './src/data/**.js',
            helpers: ['./src/handlebars/**.js', './node_modules/handlebars-layouts/index.js'],
            partials: './src/partials/**.hbs',
            dataEach: function (context, file) {
                // map frontMatter attributes directly in context without file as prefix
                _.assign(context, file.frontMatter);
                // add file meta information to context
                context.fileAttr = {mtime: file.stat.mtime, shortPath: file.path.replace(file.cwd, '')};
                return context;
            }
        }))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('less', ['bower'], function () {
    return gulp.src('./src/assets/css/design.less')
        .pipe(less())
        .pipe(uncss({ html: ['./build/*.html'], ignore: [ /(progress|chart|tooltip|popover|scrollUp|nonrocketico)+.*/ ] }))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('uglify:aboveTheFold', function () {
    return gulp.src(['./bower_components/jquery/dist/jquery.js', './bower_components/bootstrap/dist/js/bootstrap.js', './bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js',
                     './src/assets/js/aboveTheFold.js'])
        .pipe(uglify({compress: true}))
        .pipe(concat('aboveTheFold.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('uglify:finishing', function () {
    return gulp.src(['./bower_components/skrollr/dist/skrollr.min.js', './bower_components/scrollup/dist/jquery.scrollUp.js', './bower_components/jquery-sticky/jquery.sticky.js',
        './src/assets/js/finishing.js'])
        .pipe(uglify({compress: true}))
        .pipe(concat('finishing.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('bower', function () {
    // fetch bower dependencies
    return bower();
});

gulp.task('watch', function () {
    watch(['./src/**.hbs', './src/data/**/*.js', './src/handlebars/**/*.js', './src/partials/**/*.hbs'], function() {
        gulp.run('handlebars');
    });
    watch(['./src/assets/css/**/*.less'], function() {
        gulp.run('less');
    });
    watch(['./src/assets/js/aboveTheFold.js'], function() {
        gulp.run('uglify:aboveTheFold');
    });
    watch(['./src/assets/js/finishing.js'], function() {
        gulp.run('uglify:finishing');
    });
});

gulp.task('browserSync', function () {
    return browserSync.init({
        server: "./build"
    });
});

gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy', function () {
    return gulp.src(['./src/assets/**', '!./src/assets/{css,js}{,/**}'])
        .pipe(gulp.dest('build'));
});