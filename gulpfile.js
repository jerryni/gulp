var path = require('path');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var less = require('gulp-less');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var yuidoc = require('gulp-yuidoc');

// Lint JS
gulp.task('lint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('minify', function() {
    return gulp.src('src/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Watch Our Files
gulp.task('watch', function() {
    gulp.watch('src/*.js', ['lint', 'minify']);
});

// Default
gulp.task('default', ['lint', 'minify', 'watch']);

gulp.task('clean', function() {
    return gulp.src('build', {
            read: false
        })
        .pipe(clean());
});

gulp.task('vendor', function() {
    return gulp.src('vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build'))
        .pipe(filesize())
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('build'))
        .pipe(filesize())
        .on('error', gutil.log)
});

gulp.task('css', function() {
    return gulp.src('less/**/*.less')
        .pipe(changed('build/css'))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('build/css'))
        .on('error', gutil.log);
});

gulp.task('css:watch', function() {
    watch({
        glob: 'less/**/*.less',
        emit: 'one',
        emitOnGlob: false
    }, function(files) {
        return files
            .pipe(less({
                paths: [path.join(__dirname, 'less', 'includes')]
            }))
            .pipe(gulp.dest('build/css'))
            .on('error', gutil.log);
    });
});

gulp.task('yuidoc:watch', function () {
    watch('src/js/*.js', function(){
        gulp.src('src/js/*.js')
        .pipe(yuidoc())
        .pipe(gulp.dest('./jsdocoutput'));
    });
});

gulp.task('yuidoc', function() {
    return gulp.src('src/js/*.js')
        // .pipe(yuidoc.parser())
        // .pipe(yuidoc.generator())
        // .pipe(yuidoc.reporter())
        .pipe(yuidoc())
        .pipe(gulp.dest('./jsdocoutput'));
});


var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

// 无损压缩文件
gulp.task('imagemin', function(){
  gulp.src('src/images/**')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest('src/images/dist/'));
});