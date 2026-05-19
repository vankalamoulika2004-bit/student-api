const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require("./model/User")
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
//middleware
app.use(express.json());

//-----------------step2-----------------------

mongoose.connect("mongodb+srv://vankalamoulika2004_db_user:aitam@cluster0.kjqce2g.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("db connected")
})


//--------------------step2---------------------------
//login protected midleware

const verifytoken = (req,res,next)=>{


const token = req.headers.authorization;


if(!token){
    return res.send("token misssing");
}

try{

    jwt.verify(token,"secretkey");
    next();

}catch(err){
console.log("invalid token")
}

}
//app.get('/',(req,res)=>{
  //  res.send("Hello World")
//})


app.post("/students/add",async(req,res)=>{
try{

const user = new User(req.body);cc

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
//single data read
app.get("/students/:id",async(req,res)=>{

    try{
   

        const user = await User.findById(req.params.id);
       res.send(user);



    }catch(err){
    console.log(err)
}
})
//Sign up

app.post("/register", async(req,res)=>{
    
    try{

      const {name,email,password} = req.body;

      const userExists = await User.findOne({email})

      if(userExists){
        return res.end("user already in db")
      }

      const hashpassword = await bcrypt.hash(password,13);
      console.log("hashpassword",hashpassword)


      const user = new User({
        name,
        email,
        password: hashpassword
      })

      await user.save();

    }catch(err){
        console.log(err);
    }

})

//login
app.post("/login", verifytoken,async(req,res)=>{
try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.end("user not found");
    }


    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
        return res.end("inavlid pswrd");
    }

   const token = jwt.sign(
    {id:user._id},
    "secretkey",
    {expiresIn: "1h"}
   )

   res.send({
    message: "login successful",
    token
   })

}catch(err){
 console.log(err);
}
})




app.listen(4000,()=>{
 console.log("server started")
})