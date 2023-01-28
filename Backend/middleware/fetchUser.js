var jwt = require('jsonwebtoken');
const JWT_SECRET = 'ab_kiya_batau_dil_ka_dasta';

const fetchuser  = (req,res,next)=>{

// get token from the hadear and id to the request objcet 
//this is a header token we will validate it then we get the value for the user data 
const token = req.header('auth-token');
if(!token){
    res.status(401).send({error:"Please authenticate using a valid token"})
}

try {
    const decoded = jwt.verify(token, JWT_SECRET); //its varifying is the passed user token
    req.user = decoded.user;
    next();

  } catch(err) {
    res.status(401).send({error:"Please authenticate using a valid token"})

  }

}
module.exports = fetchuser