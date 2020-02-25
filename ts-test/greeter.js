// Taken from https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
// --strictNullChecks
function greeter(person) {
    // Why even the '?' ?
    return "Hello, " + person;
}
//let user = "Jane User";
var user = null;
var user1 = { name: "Georges" };
var user2 = { name: "Georges" };
var user3 = user2; // compile just fine
//////////////////////////////////////////////////////////////
var x = [0, 1, user1];
/////////////////////////////////////////////////////////////
var Y = /** @class */ (function () {
    function Y(x1, y) {
        this.x = y;
        this.y = x1;
        // this.y is uninitialized
        // requires --strictPropertyInitialization
    }
    Y.prototype.show = function () {
        console.log(this.y);
    };
    return Y;
}());
var y2 = new Y("foo", "bar");
////////////////////////////////////////////////
// --noImplicityAny
function add(a) { return a + 1; }
function addAB(a, b) { return add(a) + b; }
addAB("this should break but doesn't :(", 100);
////////////////////////////////////////////////
var d1;
d1 = "foo";
//let d = "2" - 2
var d = d1 - 2;
d1 = [];
//let b1 = [] == false;
var b1 = d1 == false;
