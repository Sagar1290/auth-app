import 'dotenv/config'
// import cors from 'cors'
import express from "express"
import mongoose from "mongoose"
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser'

const DB_NAME = "auth_db"
await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    .then(() => {
        console.log("Connection to database successful!")
    }).catch((err) => {
        console.log(`Error while connecting to db `);
        throw err
    })


const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin: process.env.CORS_ORIGIN
// }))

app.use('/api/user', userRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`hey there your app is started at port ${port}`)
})