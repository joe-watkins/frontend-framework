// todo cleanup tasks at bottom

'use strict';

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    pngcrush = require('imagemin-pngcrush'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    svgstore = require('gulp-svgstore'),
    cheerio = require('gulp-cheerio'),
    svg2png = require('gulp-svg2png'),
    gtenon = require('gulp-tenon-client'),
    reload = browserSync.reload,
    appDefaults = require("./config.json");

    // Gulpfile
    function gulpfile(){
      return gulp.src('gulpfile.js')
        .pipe(notify({ message: 'Gulpfile Changed!!' }));
    }

    // Styles
    function styles(){
      return gulp.src(appDefaults.stylesDir+'**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions','ie >= 8'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(cssnano())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(appDefaults.stylesDir))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Styles task complete' }));
    }

    // Concat Main Scripts
    function buildScripts(){
      return gulp.src(appDefaults.mainJsFiles)
        .pipe(concat(appDefaults.jsMin))
        // .pipe(uglify())
        .pipe(gulp.dest(appDefaults.jsDir))
        .pipe(browserSync.stream())
        .pipe(notify({message: 'JS Compiled'}));
    }

    // jshint
    function lint(){
      return gulp.src(appDefaults.jsPartialsDir+'**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
    }

    // imagemin
    function minifyImages(){
      return gulp.src(appDefaults.imagesDir+'/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(appDefaults.imagesDir));
    }

    // svgmin
    function minifySvg(){
      return gulp.src(appDefaults.iconsDir+"*.svg")
        .pipe(svgmin())
        .pipe(gulp.dest(appDefaults.iconsDir));
    }

    // svgStore
    function svgStore(){
      return gulp.src(appDefaults.imagesDir+"/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore()) // svgStore
        .pipe(cheerio(function ($, file) { // add display: none;
          $('svg').attr("style","display:none");
          $('[fill]').removeAttr('fill');
        }))
        .pipe(rename(appDefaults.svgDefsOutput))
        .pipe(gulp.dest(appDefaults.imagesDir));
    }

    // svg to png
    function svgtopng(){
      return gulp.src(appDefaults.imagesDir+"/**/*.svg")
        .pipe(svg2png())
        .pipe(gulp.dest(appDefaults.imagesDir+'/fallbacks'));
    }

    // tenon.io
    function tenon(done){
      gulp.src('index.html', {read: false})
      .pipe(gtenon({
        key: 'enterkeyhere',
        snippet: true,
        filter: [31, 54],
        saveOutputIn: 'allHtml.json',
        level: 'AA'
      }));
      done();
    }


    // Watch Files For Changes & Reload
    gulp.task('serve', function () {

      browserSync({
        notify: false,
        // proxy: appDefaults.localProxy
        server: {
          baseDir: appDefaults.baseDir
        }
      });

      gulp.watch('**/*.html', tenon);
      gulp.watch(appDefaults.sassDir+'**/*.scss', styles);
      gulp.watch(['scripts/**/*.js','!scripts/main.min.js'], gulp.series(lint,buildScripts));
      gulp.watch('gulpfile.js', gulpfile);

    }); // watch

    gulp.task('sass',styles);
    gulp.task('scripts',buildScripts);
    gulp.task('image-min',minifyImages);
    gulp.task('svg-min',minifySvg);
    gulp.task('svg-store',gulp.parallel(svgStore,svgtopng));
    gulp.task('svg-2-png',svgtopng);
    gulp.task('run-tenon',tenon);
    gulp.task('default', function() {});

    // for post-merge hook
    gulp.task('git-build',gulp.parallel(styles,buildScripts));
