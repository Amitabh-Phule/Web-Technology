let superHeros = ["SuperMan","Bheem","IronMan"];
let superHeros2 = ["Krish","Shaktiman","Thor"]; 
superHeros.push(superHeros2);
console.log(superHeros);
console.log(superHeros[3]);
console.log(superHeros[2][2]);
superHeros.concat(superHeros2);
console.log(superHeros);

const anotherArray = [1,2,3,[4,5,6],7,[6,7[4,5]]]
const realAnotherArray = anotherArray.flat(Infinity);//Used to combine two arrays
console.log(realAnotherArray);
const realAnotherArray2 = anotherArray.flat(1);
console.log(realAnotherArray2);//Nested Array

console.log(Array.isArray("Aditya"));//Used for data scripting,Ask questin to array.
console.log(Array.from("Aditya"));//Converts to array
//console.log(Array.isArray{name : "", age : 20});//Give empty array directly 

let score  = 100;
let score2 = 200;
let score3 = 300;
console.log(Array.of(score,score2,score3));

