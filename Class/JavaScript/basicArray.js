   let myArr = [0,1,2,3,4,"ADi"];
   console.log(myArr);

   const myArr2 = new Array(0,1,2,3,4);
   console.log(myArr2);
   
   console.log(myArr[1]);

   //Array Methods
   myArr.push(5);//Add value in array
   console.log(myArr);
   console.log(myArr.pop());//Remove last value
   console.log(myArr);
   console.log(myArr.unshift(9));//It shift all element and add in first position
   console.log(myArr);
   myArr.shift();
   console.log(myArr);
   myArr.includes(4);
   console.log(myArr);
   
   const newArr = myArr.join();
   console.log(newArr);
   console.log(typeof newArr);
   
  
   
