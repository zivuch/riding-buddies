import jwt from 'jsonwebtoken';
import Users from '../models/UsersModel.js';

export const VerifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken || req.headers['x-access-token'];
    //returning from the middlewear
    if(!accessToken)return res.status(401).json({msg:'Permission Denied'})

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decode)=>{
        if(err) return res.status(403).json({msg:'Token Verification Failed'})
        try{
            const user = await Users.findAll({
                where:{
                    email: decode.email
                }
            })
            next()
        }catch(e){
            res.status(403).json({msg:'User Verification Failed'})
        }
    })
}