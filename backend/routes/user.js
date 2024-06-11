// Define a new router in backend/routes/user.js and import it in the index router.
// Route all requests  that go to /api/v1/user to the user router.

const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const  { authMiddleware } = require("../middleware");



// 1. singup
// This route needs to get user information, do input validation using zod and store the information in the database provided
//  1. Inputs are correct (validated via zod)
//  2. Database doesn’t already contain another user

const singupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()

})

router.post("/signup", async (req,res)=>{
    // get the user information
    const body = req.body;
    // validate the user information using zod
    const {success} = singupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }
    
    const user = User.findOne({username : body.username});
    if(user._id){
        return res.status(411).json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    // store the information in the database
    const dbUser = await User.create(body);

    const userId = dbUser._id;
    // -------------- create new account --------------
    await Account.create({
        userId ,
        balance : 1 + Math.random()*10000
    })

    //-----------------

    const token = jwt.sign({
        userId,

    },JWT_SECRET)
    res.json({
        message : "User created successfully",
        token : token
    })
    
})

// 2. signin
// Let’s an existing user sign in to get back a token.
const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})
router.post("/signin",async (req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)

        res.json({
            token : token
        })
        return;
    }

    res.status(411).json({
        message : "Error while logging in"
    })
})

// . Route to update user information
// User should be allowed to optionally send either or all of
// password
// firstName
// lastName
// Whatever they send, we need to update it in the database for the user.

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/",authMiddleware, async (req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

	await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

// Route to get users from the backend, filterable via firstName/lastName
// This is needed so users can search for their friends and send them money

// Method: GET
// Route: /api/v1/user/bulk
// Query Parameter: ?filter=harkirat

router.get("/bulk", authMiddleware, async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;