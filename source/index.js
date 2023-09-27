const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

const templatePath=path.join(__dirname,'../views')

app.use(express.json())
app.use('/public',express.static('public'))
app.set("view engine","hbs") 
app.set("views",templatePath)
app.use(express.urlencoded({encoded:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{   

const data={
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
}

await collection.insertMany([data])

res.render("login")

})

app.post("/login",async (req,res)=>{

    try{
    const check=await collection.findOne({email:req.body.email})

    if(check.password==req.body.password){
        res.render("home")
    }
    else{
        res.send("wrong password")
        res.render("login")
    }
    
    }
    catch{
      
    res.send("wrong details")

    }
})

app.listen(3008,()=>{
    console.log("port connected");
})