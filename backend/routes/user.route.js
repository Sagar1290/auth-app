import express from 'express'
import testController from '../controllers/test.controller.js';
import { loginUser, loginUsingGoogle, regitserUser, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utls/verifyToken.js';

const userRoute = express.Router();

userRoute.get('/test', testController)
userRoute.post('/register', regitserUser)
userRoute.post('/login', loginUser)
userRoute.post('/google', loginUsingGoogle)
userRoute.post('/update/:id', verifyToken, updateUser)

export default userRoute;