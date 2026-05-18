const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require("./model/User")
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
app.use(express.json());



mongoose.connect("mongodb+srv://vankalamoulika2004_db_user:aitam@cluster0.kjqce2g.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("db connected")
})


//app.get('/',(req,res)=>{
  //  res.send("Hello World")
//})


app.post("/students/add",async(req,res)=>{
try{

const user = new User(req.body);

await user.save();

res.send(user);
        
}catch(err){
res.send(err)
}
});
//get data
app.get("/students",async(req,res)=>{
try{

    const user = await User.find();

    res.send(user);

}catch(err){
    console.log(err)
}
})

//update
app.put("/students/update/:id",async(req,res)=>{
  
     try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}

        )

        res.send(user);
     }catch(err){

     }

})

//delete operation
app.delete("/students/:id",async(req,res)=>{

    try{
   

        const user = await User.findByIdAndDelete(req.params.id);
       res.send("user deleted");



    }catch(err){
    console.log(err)
}
})

app.listen(4000,()=>{
 console.log("server started")
})