//2]object singleton
const user = new Object;
console.log(user);


//non-singleton object
const user2 = {};
user2.id = 123;
user2.name = "Aditya";
user2.city = "latur";
user2.isLogin = true
console.log(user2);


//nested object 
const regularUser = {
    email:"abc@gmail.com",
    fullname:{
        fname:"Aditya",
        lname:"Suryakar"
    }
}
console.log(regularUser);
console.log(regularUser.fullname.fname);
