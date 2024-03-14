import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            msg: 'User registered successfully',
            statusCode: 201,
            status: true,
            user: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            msg: 'Failed to register user',
            statusCode: 500,
            status: false
        });
    }
}


/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                msg: "User does not exist."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                msg: "Invalid credentials."
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({
            statusCode: 200,
            status: true,
            token,
            user,
            msg: 'Login success'
        });
    } catch (err) {
        res.status(500).json({ statusCode: 500, status: false, error: err.message });
    }
};
