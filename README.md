## Rollup.js 下一代的ES6模块打包机


在我们模块化项目时，经常调用一个模块，使用了其中一个方法，其它N多的方法我们未调用，我们希望未调用到的方法或者变量忽略它们，并且不打包到js文件中，这样在大项目里面可以显著减少文件的体积，特别在移动终端，虽然4G非常快，但是我还是希望更省流量。


ES6帮我们实现了，目前 `webpack` 和 `browserify` 都还不支持这一屌爆了的功能。如果你现在就想实现这一功能的话，你就可以尝试使用`rollup.js`


**maths.js**  

```js
export function square ( x ) {
    return x * x;
}
export function cube ( x ) {
    return x * x * x;
}
```

**main.js**  

```js
import { cube } from './maths.js';
console.log( cube( 5 ) ); // 125
```

通过 `rollup.js` 编译，`maths.js`中未调用的方法 `square()` 并未打包到新的js中。代码如下：

```js 
(function () {
    'use strict';
    function cube ( x ) {
        return x * x * x;
    }
    console.log( cube( 5 ) ); // 125
}());
```

## 使用方法

使用`gulp`工具来搞定打包功能。首先在根目录建立`gulpfile.js` 和 `package.json` 文件这个是 `gulp` 工具的标配。如果你不知道怎么玩儿`gulp`，你得先去研究研究

**先安装依赖模块**

```bash
npm install gulp --save
npm install rollup --save
npm install rollup-plugin-commonjs --save
npm install rollup-plugin-node-resolve --save
```

**gulpfile.js**  

```js 
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
            // amd – 使用像requirejs一样的银木块定义
            // cjs – CommonJS，适用于node和browserify / Webpack
            // es6 (default) – 保持ES6的格式
            // iife – 使用于<script> 标签引用的方式
            // umd – 适用于CommonJs和AMD风格通用模式
            format: 'cjs'
        });

        fs.writeFileSync( 'bundle.js', result.code );

        bundle.write({
            format: 'cjs',
            dest: 'dist/main.js'
        });
    });
});
```

再去建立 `main.js` 和 `main.js` ，运行 `npm script` 进行打包，就可得到你想要的js 文件了。

## rollup 插件

[Plugins](https://github.com/rollup/rollup/wiki/Plugins): https://github.com/rollup/rollup/wiki/Plugins


* [babel](https://github.com/rollup/rollup-plugin-babel) – transpile code with Babel
* [browserify-transform](https://github.com/lautis/rollup-plugin-browserify-transform) – use Browserify transforms as plugins
* [coffee-script](https://github.com/lautis/rollup-plugin-coffee-script) – convert CoffeeScript to JS
* [commonjs](https://github.com/rollup/rollup-plugin-commonjs) – convert CommonJS modules to ES6
* [eslint](https://github.com/TrySound/rollup-plugin-eslint) - verify entry and imported scripts
* [includepaths](https://github.com/dot-build/rollup-plugin-includepaths) – provide base paths to resolve imports from
* [inject](https://github.com/rollup/rollup-plugin-inject) – detect dependencies and inject them
* [istanbul](https://github.com/artberri/rollup-plugin-istanbul) – Instruments code for code coverage with Istanbul
* [json](https://github.com/rollup/rollup-plugin-json) – convert JSON to ES6
* [memory](https://github.com/TrySound/rollup-plugin-memory) - load entry from memory
* [multi-entry](https://github.com/eventualbuddha/rollup-plugin-multi-entry) – allows multiple 'entry points' instead of just one
* [node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) – use the Node.js module resolution algorithm (e.g. modules from `node_modules`, installed with npm)
* [pegjs](https://github.com/cameronhunter/rollup-plugin-pegjs) - import PEG.js grammars as parsers
* [postcss](https://github.com/egoist/rollup-plugin-postcss) - compile postcss and insert to head
* [ractive](https://github.com/rollup/rollup-plugin-ractive) – precompile Ractive components
* [replace](https://github.com/rollup/rollup-plugin-replace) – replace occurrences of a set of strings
* [riot](https://github.com/riot/rollup-plugin-riot) - compile Riot.js tag file
* [string](https://github.com/TrySound/rollup-plugin-string) – import text files as strings
* [stylus-css-modules](https://github.com/mtojo/rollup-plugin-stylus-css-modules) – compile Stylus and inject CSS modules
* [uglify](https://github.com/TrySound/rollup-plugin-uglify) - minify generated bundle
* [vue](https://github.com/znck/rollup-plugin-vue) - compile vue components


## 参考资料

[官网](http://rollupjs.org):`http://rollupjs.org`  
[Github](https://github.com/rollup/rollup):`https://github.com/rollup/rollup`  