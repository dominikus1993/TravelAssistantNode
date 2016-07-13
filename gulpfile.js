"use strict";
const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const tsb = require('gulp-tsb');
const notify = require('gulp-notify');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const jasmine = require("gulp-jasmine");
const reporters = require('jasmine-reporters');


const tsFiles = ["src/**/*.ts", "typings/**/*.ts", "test/**/*.ts"];
const jsFiles = ["src/**/*.js", "!node_modules/**/*.js", "test/**/*.js"];
const compilation = tsb.create({
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


gulp.task("test", ["build", "buildjs"], function () {
    return gulp.src("test/**/*.js").pipe(jasmine({
        reporter: new reporters.NUnitXmlReporter()
    }));
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