import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.access_token;

    console.log(`token: ${token}`);

    if (!token) return next(errorHandler(409, "you are not a authorized person to update details!!"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(407, "token invalid"));
        console.log("token verifiied")
        req.user = user;
        next();
    })
}