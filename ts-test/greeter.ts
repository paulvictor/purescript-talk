// Taken from https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
// --strictNullChecks
function greeter(person?: string) {
    // Why even the '?' ?
    return "Hello, " + person;
}

//let user = "Jane User";
let user = null;

//document.body.textContent = greeter(user);

////////////////////////////////////////////////////////////
interface User {
   name: string
}
interface User2 {
   name: string
}

const user1: User = { name: "Georges" };
const user2: User2 = { name: "Georges" };

const user3: User = user2; // compile just fine

//////////////////////////////////////////////////////////////

let x = [0,1,user1];

/////////////////////////////////////////////////////////////

class Y {
  y: string;
  x: string;
  constructor(x1: string, y: string){
    this.x = y;
    this.y = x1;
    // this.y is uninitialized
    // requires --strictPropertyInitialization
  }
  show(){
    console.log(this.y);
  }
}
let y2 = new Y("foo", "bar");
////////////////////////////////////////////////

// --noImplicityAny
function add(a:number) { return a + 1 }
function addAB(a, b) {return add(a) + b}

addAB("this should break but doesn't :(", 100)
////////////////////////////////////////////////


let d1: any
d1 = "foo"
//let d = "2" - 2
let d = d1 - 2

d1 = [];
//let b1 = [] == false;
let b1 = d1 == false;
