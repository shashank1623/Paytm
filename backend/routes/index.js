// Step 1
// Create a new file backend/routes/index.js that exports a new express router.

const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("I'm alive")
})
router.use("/user", userRouter); 
router.use("/account",accountRouter)

module.exports = router;

// api/v1/user
// api/vi/transactions