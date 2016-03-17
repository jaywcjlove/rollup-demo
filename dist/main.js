!function(global, factory) {
    "object" === typeof exports && "undefined" !== typeof module ? factory() : "function" === typeof define && define.amd ? define(factory) : factory();
}(this, function() {
    "use strict";
    function cube(x) {
        return x * x * x;
    }
    function a(y) {
        return cube(y) + 55;
    }
    var ab = {
        test: function() {
            return "2";
        }
    }, foos = {
        "catch": function() {}
    };
    console.log(foos);
    console.log(cube(5));
    // 125
    console.log(a(5));
    // 125
    console.log(ab.test());
});