const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const router = express.Router();

// 1. An endpoint for user to get their balance.
// Method: GET
// Route: /api/v1/account/balance
// Response:
// Status code - 200

router.get("/balance",authMiddleware , async (req,res)=>{
    const account = await Account.findOne({userId : req.userId});

    res.json({
        balance : account.balance
    })
})

// 2. An endpoint for user to transfer money to another account
// Method: POST
// Route: /api/v1/account/transfer
// Body
// {
//	to: string,
//	amount: number
//}

// Response:
// Status code - 200
// {
//	message: "Money transferred successfully"
//}

// Status code - 400
// {
//	message: "Insufficient balance"
//}
// status code - 400
// {
//	message: "Invalid account"
//}

router.post("/transfer",authMiddleware , async(req,res)=>{
    
})


module.exports = router;