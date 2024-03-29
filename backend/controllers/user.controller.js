import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utls/errorHandler.js";
import jwt from "jsonwebtoken";

const regitserUser = async (req, res, next) => {
    const { username, email, fullname, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return next(errorHandler(409, "username already taken"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        fullname,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(200).json({
            message: "user registered successfully",
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) return next(errorHandler(404, "all fields are compulsory"))

    const validUser = await User.findOne({ username });

    if (!validUser) return next(errorHandler(404, "user not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "invalid credential!!"));

    const token = jwt.sign(
        {
            id: validUser._id,
        },
        process.env.JWT_SECRET
    );

    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiredIn = new Date(Date.now() + 1 * 60 * 60 * 1000);
    res.cookie("access_token", token, { httpOnly: true, expires: expiredIn });
    res.status(200).json({ rest, message: "user login successfully" });
};

const loginUsingGoogle = async (req, res, next) => {
    const { fullname, email, photoURL } = req.body;
    try {
        const validUser = await User.findOne({ email });
        console.log("user found: ", fullname)
        if (validUser) {
            const { password: hashedPassword, ...rest } = validUser._doc;

            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
            const expiredIn = new Date(Date.now() + 1 * 60 * 60 * 1000);
            res.cookie("access_token", token, { httpOnly: true, expires: expiredIn }).status(200).json({ rest, message: "user login successfully" });
        } else {
            console.log("new user :", fullname)
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword2 = bcryptjs.hashSync(generatedPassword, 10);

            const createdUser = new User({
                username: fullname.split(" ").join("").toLowerCase() + (Math.random() * 1000).toString().substring(0, 3),
                fullname,
                email,
                password: hashedPassword2,
                photoURL
            })

            await createdUser.save();
            const { password, ...rest } = createdUser._doc;
            const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);
            const expiredIn = new Date(Date.now() + 1 * 60 * 60 * 1000);
            res.cookie("access-token", token, { httpOnly: true, expires: expiredIn }).status(200).json({ rest, message: "user login successfully" });
        }
    } catch (error) {
        next(errorHandler(error));
    }
};


//update user controller: 

const updateUser = async (req, res, next) => {
    console.log(req.user)

    if (req.user.id != req.params.id) return next(errorHandler(403, "you can only update your details"));

    try {
        const updatedField = {};
        if (req.body.fullname) {
            updatedField.fullname = req.body.fullname
        }
        if (req.body.password) {
            updatedField.password = bcryptjs.hashSync(req.body.password, 10);
        }
        if (req.body.photoURL) {
            updatedField.photoURL = req.body.photoURL
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedField, { new: true });

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({ rest, message: "user details updated successfully!" });
    }
    catch (error) {
        return next(errorHandler(error))
    }
}

export const signOut = async (req, res) => {
    await res.clearCookie('access_token').status(201).json({ message: "user logout successfull" })
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id != req.params.id) return (errorHandler(420, "you can only delete your account!"))

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token').status(200).json({ message: "user deleted succcessfully" })
    } catch (error) {
        return next(errorHandler(404, "something went wrong"))
    }

}

export { regitserUser, loginUser, loginUsingGoogle, updateUser };
