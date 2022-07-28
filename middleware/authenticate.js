const jwt = require("jsonwebtoken")
const User = require("../models/user")
const Admin = require("../models/admin")

const authenticate = async (req,res,next) => {
    try{
        //console.log(req);
        const token = req.cookies.lmstoken;
        //console.log('token', token);
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
        //console.log('jwt ', verifyToken);
        const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token})
        const rootAdmin = await Admin.findOne({_id:verifyToken._id,"tokens.token":token})
        //console.log('root user ', rootUser);
        //console.log('admin', rootAdmin);
        if(!rootUser && !rootAdmin){
            throw new Error("User not found")
        }

       if(rootUser){
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
       }
       else if(rootAdmin){
        req.token = token;
        req.rootUser = rootAdmin;
        req.userID = rootAdmin._id;
       }

        next();

        
    }catch(error){
        res.status(401).send("Unauthorized")
        //console.log(error)
    }
}



module.exports = authenticate