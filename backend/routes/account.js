const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
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
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount,to} = req.body;

    //fetch the accounts within the transaction
    const account = await Account.findOne({userId : req.userId}).session(session);


    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId : to}).session(session);
    
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Invalid account"
        })
    }

    //perform the transfer
    await Account.updateOne({userId : req.userId},{ $inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to},{ $inc : {balance : amount}}).session(session);

    //commit the transaction
    await session.commitTransaction();

    res.json({
        message : "Money transferred successfully"
    });

});


module.exports = router;