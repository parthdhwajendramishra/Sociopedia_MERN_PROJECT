import jwt from 'jsonwebtoken';
import { token } from 'morgan';

export const verifyToken= async (req,res,next)=>{
    try{
        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();

    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}