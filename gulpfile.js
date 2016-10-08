var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('webpack');

gulp.task('scripts', function (callback) {
    webpack({
        entry: './src/image-map-highlighter.js',
        output: {
            filename: 'image-map-highlighter.js',
            path: './dist',
            library: 'ImageMapHighlighter',
            libraryTarget: 'umd'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    }, () => {
        callback()
    });
});

gulp.task('styles', function () {
    gulp.src('src/image-map-highlighter.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['styles', 'scripts']);
