let score = "22";
console.log(typeof score);

let score_for_bool = true;
console.log(typeof score_for_bool);

let score_for_null = null;
console.log(typeof score_for_null);

let score_for_undefined;
console.log(score_for_undefined);


//Typecasting - String to Number
let score2 = "132abc";
console.log(typeof score2);//this is not proper number so it is string , but it cannot be convert to number.

let score_convert = Number(score2);
console.log(typeof score2,score2 , score_convert);

//Typecasting - Number to String  
let score3 = 100;
let score3_convert = String(score3);
console.log(typeof score3, score3, score3_convert);


//Activity 01
//Typecasting - Number to String,boolean,null  
//Arithematic Operation
let a = 2;
let b = 4;
console.log(a+b,a-b,a*b,a/b,a%b);

//str add
let str1 ="Hello ";
let str2 ="Adii";
console.log(str1 + str2);

//Note : JS only automatically converts string to num in arith operations;


//conversions
console.log("1" + 2);
console.log("1" + 2 + 2);
console.log((1 + "2"));
console.log(1+3+"2")
console.log((3+4)*5%3);
;




