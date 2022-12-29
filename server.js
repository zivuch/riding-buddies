import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/elephantSQL.js'
import router from './routes/Users.js';
import path from 'path'

dotenv.config();
const app = express()

app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const mymw = (req, res, next) => {
    console.log(req.body);
    next()
}
//to use globaly
app.use(mymw)
// to use only for one route, or in an array for lots of routes ex ['./users', './login]
app.use('./users', mymw)

app.use(router)

app.listen(process.env.PORT||8080, ()=>{
    console.log(`run on ${process.env.PORT||8080}`)
})

//Sequelize - to test if the connection is OK
try{
    await db.authenticate()
    console.log('Connection has been established successfully.')
}
catch(error){
    console.error('Unable to connect to the database:', error);
}

//add below in order to deploy app in 1 folder
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, './riding-buddies/build')))

app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, './riding-buddies/build', 'index.html'))
})