const  dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");

const app = express();

app.use(express.json()); // this line wil read the body of the req sent from the client in json format

app.use((req,res,next)=>{
    console.log("------------");
    console.log(new Date(), req.url);
    console.log(req.method);
    console.log("------------");
    next();
});

app.get("/",(req,res)=>{
    res.status(200);
    res.json({
        isSuccess: true,
        message: "Server is running",
        data: {},
    });
});


app.get("/hello",(req,res)=>{
    res.status(200);
    res.json({
        isSuccess: true,
        message: "Hi,How are you ?",
        data: {},
    });
});

app.use((req,res,next)=>{
    console.log("!!!!!!!!!!!!!!");
    res.json({
        isSuccess: false,
        message: "Route can't found",
        data: {},
    });
;});


app.listen(8080,()=>{
    console.log("----Server is running----");
});