import 'dotenv/config'
// import cors from 'cors'
import express from "express"
import mongoose from "mongoose"
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

const DB_NAME = "auth_db"
await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    .then(() => {
        console.log("Connection to DB successful!")
    }).catch((err) => {
        console.log(`Error while connecting to db `);
        throw err
    })

const __dirname = path.resolve();
console.log(__dirname)

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(express.json());
app.use(cookieParser());

// USE OF CORS, BUT IT IS GIVING ERROR WHILE DEALING WITH COOKIES

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
    console.log(`server started at port ${port}`)
})