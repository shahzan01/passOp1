import { Error } from "mongoose";
import {z} from "zod"

function inputvalidation(req,res,next){
try{

    const requireBody=z.object({
        email:z.string().email(),
        password:z.string().min(5).max(40),
            })
        
        const valid=requireBody.safeParse(req.body);
        if(!valid.success){
            throw valid.error
        }
next();



}
catch(e){
    return res.status(400).json({ error: 'Invalid email or password' });
}

}




export default inputvalidation