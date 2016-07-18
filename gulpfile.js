"use strict";
const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const typescript = require('gulp-typescript');
const notify = require('gulp-notify');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const jasmine = require("gulp-jasmine");
const reporters = require('jasmine-reporters');
const sourcemap = require("gulp-sourcemaps");

const tsFiles = ["src/**/*.ts", "typings/**/*.ts", "test/**/*.ts"];
const jsFiles = ["src/**/*.js", "!node_modules/**/*.js", "test/**/*.js"];

var tsProject = typescript.createProject({
    removeComments: true,
    declaration: false,
    noEmitOnError: true,
    module: 'commonjs',
    target : "ES6"
});


function build() {
    return gulp.src(tsFiles)
        .pipe(sourcemap.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemap.write())
        .pipe(gulp.dest(function (file) { return file.base; }))
        .pipe(notify({
            title: 'DONE COMPILATION TYPESCRIPT',
            message: 'Compile file  <%= file.relative %>',
            onLast: true,
            notifier: function(args){}
        }));
}

function buildJs() {
    return gulp.src(jsFiles).pipe(babel({
        presets: ['es2015']
    })).pipe(gulp.dest(function(file){
        return file.base;
    })).pipe(notify({
        title: 'DONE COMPILATION JAVASCRIPT',
        message: 'Compile file  <%= file.relative %>',
        onLast: true,
        notifier: function(args){}
    }));
}

gulp.task("build", function() {
    return build();
});

gulp.task("compile", ["build"], function () {
    return buildJs();
});


gulp.task("test", ["compile"], function () {
    return gulp.src("test/**/*.js").pipe(jasmine({
        reporter: new reporters.NUnitXmlReporter()
    }));
});

gulp.task("nodemon", ['watch'], function(cb){
    var started = false;

    return nodemon({
        script: 'src/bin/www',
        watch: jsFiles
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    }).on('restart', function onRestart() {
        setTimeout(function reload() {
            browserSync.reload({
                stream: false
            });
        }, 500);  // browserSync reload delay
    });
});


gulp.task("watch", function () {
    gulp.watch(tsFiles, ["compile"]);
});

gulp.task('sync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["src/public/**/*.*", "src/views/**/*.*"],
        browser: "chrome",
        port: 3000
    });
});