const  dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");
const cors = require("cors");

const {apiRouter} = require("./api/v1/routes");

const app = express();
require("./config/db.js");
app.use(express.json()); // this line wil read the body of the req sent from the client in json format
app.use(cors());

app.use((req,res,next)=>{
    console.log("-------------");
    console.log(new Date(),req.url,req.method);
    console.log("-------------");
    next();
});

app.use("/api/v1",apiRouter);

app.listen(8080,()=>{
    console.log("----Server is running----");
});