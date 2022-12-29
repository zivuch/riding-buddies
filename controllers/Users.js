import Users from "../models/UsersModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import db from '../config/elephantSQL.js';


export const getUsers = async (req, res)=>{
    try{
        const users = await Users.findAll({
            //attributes=columns
            attributes:['id', 'email']
        })
        res.json(users)
    }catch(e){
        console.log(e);
        res.status(404).json({msg:'not found'})
    }
}

export const register = async (req, res) => {
    const {firstname, lastname, email, gender, phonenumber, cityOfResidence, motorcycle, password} = req.body;
    //salt-gives string, hash-encrypts it
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    console.log('reg', req.body)

    try{
        //create = insert
        await Users.create({
            firstName:firstname.toLowerCase(),
            lastname:lastname.toLowerCase(),
            email:email.toLowerCase(),
            gender:gender,
            phoneNumber: phonenumber,
            cityOfResidence: cityOfResidence,
            motorcycle:motorcycle.toLowerCase(),
            password:hash
        })
        res.json({msg:'Register Succesfull'})

    }catch(e){
        console.log(e)
        res.status(404).json({msg:'email already exists'})
    }
}

export const login = async (req, res) =>{

    console.log('login', req.body);

    try{   
        const user = await Users.findAll({
            where:{
                email:req.body.email.toLowerCase()
            }
        })
        //compare passwords
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:'Wrong password'});

        const userId = user[0].id; 
        const email = user[0].email;

        //create token
        const token = jwt.sign({userId, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        })
        //store jwt in cookie called accessToken
        res.cookie('accessToken', token, {
            //puts cookie on http - to be used during development of the app
            httpOnly: true,
            //expiresIn
            maxAge: 60*60*1000
        });
        //send token as reply
        res.json({token:token})
    }catch(e){
        console.log(e);
        res.status(404).json({msg:'Email not found'})
    }
}

export const  updatedLocation = async (req, res) => {
    const {lat, lng} = req.body;
    console.log('req.body',req.body);
    try{
        const accessToken = req.cookies.accessToken || req.headers['x-access-token'];

        const decode = jwt_decode(accessToken);
        console.log('req body: ',lat,lng,decode.userId);

        await Users.update({
            lat:lat,
            lng:lng
        }, {
            where:{
                id:decode.userId
            }
        }           
        )

        const [result,metadata] = await db.query(`
        select lat, lng from users where lat is not null or lng is not null;
        `,{
            type:db.QueryTypes.SELECT
        })
        res.status(200).json(result)
        
    }catch(e){
        console.log(e);
        res.status(404).json({msg:'lat,lng,userid not found'})
    }
}

export const  getUsersLocation = async (req, res) => {
 try{
        const users = await Users.findAll({
            //attributes=columns
            attributes:['id', 'firstname', 'email', 'gender', 'motorcycle', 'lat', 'lng']
        })
        res.json(users)
    }catch(e){
        console.log(e);
        res.status(404).json({msg:'not found'})
    }   
}

export const logout = (req, res) => {
    //to get the cookie obj
    const accessToken=req.cookies.accessToken;
    if(!accessToken) return res.status(204).json({msg:'cleared'})
    res.clearCookie('accessToken');
    res.status(200).json({msg:'cleared'})
}

export const token = (req,res) => {
  const accessToken = req.cookies.accessToken || req.headers['x-access-token'];

  const decode = jwt_decode(accessToken);
  console.log(decode.userId, decode.email);

  const token = jwt.sign({userId:decode.userId,email:decode.email}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn:'1h'
  });

  res.cookie('accessToken',token, {
    httpOnly: true,
    maxAge: 60* 60 * 1000
  });

  res.status(200).json({token:accessToken})
}