// import { validator } from 'validator.tool';
import { cube } from './maths.js';
import { a } from './a.js';

var ab = {
    test(){
        return "2"
    }
}

// var foo = {
//   get bar() {
//     return "bar";
//   }
// };

var foos = {
  catch: function () {}
};

console.log(foos );
console.log( cube( 5 ) ); // 125
console.log( a( 5 ) ); // 125
console.log( ab.test() ); // 125


// var v = new validator();