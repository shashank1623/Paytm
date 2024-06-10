const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
const app = express();

const mainRouter = require("./routes/index");

app.use("api/v1/", mainRouter )


app.listen(8080,()=>{
    console.log("Server is running at port 8080")
})
// api/v1/user/singup
// api/v1/user/signin
// api/v1/user/transcation

// api/v1/account/transferMoney
// api/v1/account/balance