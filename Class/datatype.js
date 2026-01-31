//Symbol
let author_id = Symbol("123");
console.log(author_id);
let id = 123;
console.log(id===author_id);
//Javascript is dynamic lang.

//Array
const a = [ 1,2,3];
console.log(a);


//Object

const myObject = {
    name : "Aditya",
    age : 21,
    email:"surya@abc.com"
}
console.log(myObject);


//Function
function call(){
    console.log("Aditya");
    
}
call();

let aFun = function my(){
    console.log("Hello");
    
}
aFun();

// memory
// There are two types of memoery
// 1)Stack - used for premitive datatypes
// 2)Heap - used for non-premitive datatypes

//Stack - Example
let myYoutubeName = "ABS";
let newYoutubeChannel = myYoutubeName;
newYoutubeChannel = "JS";
console.log(myYoutubeName);//ABS
console.log(newYoutubeChannel);//JS
//Premitive datatypes stored in Stack , when we assign one variable to another ,
// a copy is made so changing one doesn't affect another.

//Heap - Example
let myObj = {
    fname : "Aditya",
    age : 21,
    roll : 132
}
let myObj2 = myObj;
myObj2.roll = 25;
console.log(myObj.roll);
console.log(myObj2.roll);
//Objects are stored in heap memory when we assign one object to another variable
//reference is copied not the value so when we change one variable value of both
//variables get changed. 
 

