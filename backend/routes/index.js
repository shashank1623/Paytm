// Step 1
// Create a new file backend/routes/index.js that exports a new express router.

const express = require("express");
const userRouter = require("./user");
const router = express.Router();

router.get("/user", userRouter); 


module.exports = router;

// api/v1/user
// api/vi/transactions