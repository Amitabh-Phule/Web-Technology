//We can declare object using two types 
// 1]object literal
//2]object singleton


// 1]object literal
let user = {
    name: "Aditya",
    age: 20,
    email:"adi@gmail.com",
    city:"latur",
    isLogin: true,
    lastLoginDate : ['Mon','Tues','Wed'],
    "full Name" : "AdityaSuryakar"
}
console.log(user);
console.log(user.email);
console.log(user.lastLoginDate);
console.log(user["full Name"]);

user.email = "user@gmail.com";
console.log(user.email);
//Object.freeze(user);//Freeze Value
user.email = "abc@gmail.com";
console.log(user.email);

//Symbol Example
const mysymbol=Symbol("WT")
const myobj1={
    [mysymbol]:"Hello",

}
console.log(myobj1);
console.log(typeof(myobj1));

user.greeting = function(){
    console.log("Hello.js");
    
}
console.log(user.greeting());

user.greeting2 = function(){
    console.log(`email : ${this.email}`);
    
}
console.log(user.greeting2());



