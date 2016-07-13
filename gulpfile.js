"use strict";
var gulp = require("gulp");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var tsb = require('gulp-tsb');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

var tsFiles = ["src/**/*.ts", "typings/**/*.ts"];
var jsFiles = ["src/**/*.js", "!node_modules/**/*.js"];
var compilation = tsb.create({
    target: 'es6',
    module: 'commonjs',
    declaration: false,
    "sourceMap": true,
    "noImplicitAny": false,
    "removeComments": false,
    "preserveConstEnums": false
});

function build() {
    return gulp.src(tsFiles).pipe(compilation()).pipe(gulp.dest(function (file) {
        return file.base;
    })).pipe(notify({
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

gulp.task("buildjs", ["build"], function () {
    return buildJs();
});


gulp.task("test", function () {
    return build().pipe(buildJs());
});

gulp.task("nodemon", function(cb){
    var started = false;

    return nodemon({
        script: 'app.js',
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

gulp.task("compile", ["build", "buildjs"]);

gulp.task("watch", function () {
    gulp.watch(tsFiles, ["compile"]);
});

gulp.task('sync', ['nodemon', 'watch'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["src/public/**/*.*", "src/views/**/*.*"],
        browser: "chrome",
        port: 3000
    });
});