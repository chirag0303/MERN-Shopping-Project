const mongoose = require("mongoose");;

mongoose.connect(process.env.MONGO_DB_URI,{
    dbName: "day17",
}).then(()=>{
    console.log("---------DB Connected-----------");
}).catch((err)=>{
    console.log("---- Connection Error------");
    console.log(err.message);
    console.log("------- ---------- ----------");
});