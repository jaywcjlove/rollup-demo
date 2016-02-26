var gulp        = require('gulp');
var fs          = require('fs');
var rollup      = require('rollup').rollup;
var commonjs    = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');

gulp.task('script', function () {
    return rollup({
        entry: 'src/main.js',
        plugins: [
            nodeResolve({ jsnext: true }),
            commonjs()
        ]
    }).then(function (bundle) {
        // 输出 bundle + sourcemap
        var result = bundle.generate({
            // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
            format: 'cjs'
        });

        fs.writeFileSync( 'bundle.js', result.code );

        bundle.write({
            format: 'cjs',
            dest: 'dist/main.js'
        });
    });
});