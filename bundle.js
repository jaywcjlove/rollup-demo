(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, function () { 'use strict';

    function cube ( x ) {
        return x * x * x;
    }

    function a(y){
        return cube(y) + 55   
    }

    console.log( cube( 5 ) ); // 125
    console.log( a( 5 ) ); // 125


    // var v = new validator();

}));