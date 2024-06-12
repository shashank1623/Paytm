const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("I'm alive")
})



app.use("/api/v1/", mainRouter )


app.listen(8080,()=>{
    console.log("Server is running at port 8080")
})
// api/v1/user/singup
// api/v1/user/signin
// api/v1/user/transcation

// api/v1/account/transferMoney
// api/v1/account/balance