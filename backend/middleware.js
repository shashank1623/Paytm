const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];
    try{
        const decode = jwt.verify(token,JWT_SECRET);
        if(decode.userId){
            req.userId = decode.userId;
            next();
        }else{
            return res.status(403).json({
                message : "Unauthorized"
            })
        }

    }catch(err){
        return res.status(403).json({
            message : "Unauthorized"
        })
    }
}

module.exports = {
    authMiddleware
}