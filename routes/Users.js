import express from 'express';
import {getUsers, getUsersLocation, register, login, logout, token, updatedLocation} from '../controllers/Users.js';
import { VerifyToken } from '../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/users', VerifyToken, getUsers);
router.get('/token',  VerifyToken, token)
router.get('/getUsersLocation', VerifyToken, getUsersLocation)
router.post('/register', register)
router.post('/login', login)
router.post('/updatedLocation', updatedLocation)
router.delete('/logout', logout)



export default router