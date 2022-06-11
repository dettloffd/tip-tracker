const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // required to allow post requests to move along
    if (req.method == "OPTIONS"){
        return next();
    }
    try{
        //try catch so no crash due to error in splitting (if second element of array isn't present)
        const token = req.headers.authorization.split(' ')[1];
    // Authorization: "Bearer TOKEN"
    // use blank to split into bearer and TOKEN variable
        if (!token){
            return res.status(401).json({
                success: false,
                message: "Authentication failed for this action!",
              });
              // if there's an error with the split, it won't make it past here...
        }
        let decodedToken = jwt.verify(token, 'super_secret_key' );
        // Key here must be same as set in users-controllers jwt settings **
        // includes the id and email, which was set previosly
        req.userData = {userId: decodedToken.userId};
        // userId is now being added to the request body that this gets passed to  
        next();
        // Must say next(), otherwise request will get stuck in this middleware

    } catch (err){
        return res.status(401).json({
            success: false,
            message: "Authentication failed for this action!",
          });
          // split succeeds, but don't get the token
    }
    


}