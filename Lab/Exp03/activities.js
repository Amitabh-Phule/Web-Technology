// function :- A block of code used to perform specific task
//fun 01
 function sum(num1, num2) { 
    console.log(num1 + num2); 
}
sum(5, 10); // Outputs: 15
console.log(sum);

//fun02
function sum2(n1,n2){
    let res = n1 +n2;
    return res;
    console.log(res) // code after return is never executed
}
console.log(sum2(3,4));

//fun 03
function loginUser(userName){
    return `${userName} just LoggedIn!!!`

}
console.log(loginUser('Pranali'));// when string is empty or no value is passed then it gives Undefined

//fun 04
function fun(...m1){ //spread operator : it gives multiple values under one arrr for single var
    return m1;
}
console.log(fun(200,300,400));

//fun 05
let Prod = {
   title : "Pen",
   price : 20
};

function handleObj(obj1){
    console.log(`Product name : ${obj1.title}`);
     console.log(`Product Price : ${obj1.price}`);
}
console.log(handleObj(Prod));

//fun 06
let arr1 = ["abc","xyz"];

function handleArr(obj2){
    console.log(obj2[0]);
}
console.log(handleArr(arr1));

//fun 07 
//arrow function
const sum3 = (n1,n2) => {
    return n1+n2;
}
console.log(sum3(4,5));

function tea(){
 uname = "Pranali";
    console.log(this.uname);
}
tea();

const arrFun = () =>
{
    uname = "Pranali";
    console.log(this.uname);
}
tea();

/* 
activity 01 : why we use this keyword, why we don't use in arrow fun 
activity 02 : what is arrow fun diff between simple & arrow fun
activity 03 : write a code for arrow fun with 2 example
activity 04 : write a code switch case in js
activity 05 : how to use truthy-falsy value in js
activity 06 : how to use ternary operator in js
activity 07 : write a code for how to use loops in array(5 types with example)
activity 08 : diff betwn forin and forof loop in js
activity 09 : how to use map and filter fun in js

*/