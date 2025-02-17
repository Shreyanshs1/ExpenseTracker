const jwt = require('jsonwebtoken');

const ensureAuthenticated=(req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(200)
        .json({message:'Unauthorized, no data in header'})
    }
    try{
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        //here we are saving information of user in req.user so that we dont have to access database again to get user information
        req.user = decoded;

        next();
    }
    catch(err){
        return res.status(403)
        .json({
            message:'Unauthorized, JWT Token required'
        })
    }
}

module.exports = ensureAuthenticated