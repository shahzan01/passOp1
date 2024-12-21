import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config({path:"../../.env"});
const user_jwt_secret=process.env.user_jwt_secret


function userMiddleware(req,res,next){
    const token=req.headers.token;
 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
      }
      try {
        const decoded = jwt.verify(token,user_jwt_secret);
        if(decoded){
            req.user = decoded;
            next();
        }
        
      } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
      }



}







export {userMiddleware}