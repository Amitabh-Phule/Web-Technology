//Handling Req & Res  Express appln handle http req and res
//req  : it contains info about the client's request
//e.g - url , headers,query para,req body
//route : 
const express = req;
const app = express();
const port = 3001;
app.get('/user'(req,res =>{
    console.log(req.qurey.name);
    
}))

//loclhost:3001/user?name="ADi";