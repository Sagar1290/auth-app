import express from 'express'
import testController from '../controllers/test.controller.js';
import { deleteUser, loginUser, loginUsingGoogle, regitserUser, signOut, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utls/verifyToken.js';

const userRoute = express.Router();

userRoute.get('/test', testController)
userRoute.post('/register', regitserUser)
userRoute.post('/login', loginUser)
userRoute.post('/google', loginUsingGoogle)
userRoute.get('/sign-out', signOut)
userRoute.delete('/delete/:id', verifyToken, deleteUser)
userRoute.post('/update/:id', verifyToken, updateUser)

export default userRoute;