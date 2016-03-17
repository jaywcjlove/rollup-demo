const gulp        = require('gulp');
const rollup      = require('gulp-rollup')
const uglify      = require('gulp-uglify');
const babel       = require('rollup-plugin-babel');
const fs          = require('fs');
// var rollup      = require('rollup').rollup;
// var commonjs    = require('rollup-plugin-commonjs');
// var nodeResolve = require('rollup-plugin-node-resolve');

gulp.task('default', () => {
    gulp.src('src/main.js')
      .pipe(rollup({
          // any option supported by rollup can be set here, including sourceMap
          // sourceMap: true
          format: 'umd',
          plugins:[
            babel({
                exclude: 'node_modules/**/*',
                // //externalHelpers 不包含到我打包的JS里面去
                // externalHelpers: true,
                // http://babeljs.io/docs/plugins/transform-es3-property-literals/
                // 暂时好像搞不定 
                // "plugins": ["transform-es3-property-literals"]
            })
          ]
      }))
      // babel 一些奇怪的转化方式，需要通过 uglify 再转换一下
      .pipe(uglify({
        mangle:false,
        preserveComments: 'all',
        compress:{
            sequences     : false,  // join consecutive statemets with the “comma operator”
            properties    : false,  // optimize property access: a["foo"] → a.foo
            // dead_code     : true,  // discard unreachable code
            // drop_debugger : true,  // discard “debugger” statements
            // unsafe        : false, // some unsafe optimizations (see below)
            // conditionals  : true,  // optimize if-s and conditional expressions
            comparisons   : false,  // optimize comparisons
            // evaluate      : true,  // evaluate constant expressions
            // booleans      : true,  // optimize boolean expressions
            // loops         : true,  // optimize loops
            unused        : true,  // drop unused variables/functions
            // hoist_funs    : true,  // hoist function declarations
            // hoist_vars    : false, // hoist variable declarations
            if_return     : false,  // optimize if-s followed by return/continue
            join_vars     : true,  // join var declarations
            // cascade       : true,  // try to cascade `right` into `left` in sequences
            // side_effects  : true,  // drop side-effect-free statements
            // warnings      : true,  // warn about potentially dangerous optimizations/code
            // global_defs   : {}     // global definitions
        },
        output: { 
            beautify: true 
        },
        banner:"/* eew */"
      }))
      .pipe(gulp.dest('dist'));
});


// gulp.task('default', function () {
//     return rollup({
//         entry: 'src/main.js',
//         plugins: [
//             nodeResolve({ jsnext: true }),
//             commonjs()
//         ]
//     }).then(function (bundle) {
//         // 输出 bundle + sourcemap
//         var result = bundle.generate({
//             // output format - 'amd', 'cjs', 'es6', 'iife', 'umd'
//             format: 'umd'
//         });

//         fs.writeFileSync( 'bundle.js', result.code );

//         bundle.write({
//             format: 'cjs',
//             dest: 'dist/main.js'
//         });
//     });
// });