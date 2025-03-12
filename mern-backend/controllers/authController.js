import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!isValidName(name)) {
            return res.status(400).json({ 
                success: false, 
                message: "Name should only contain English alphabets" 
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during registration" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });

        res.status(200).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error during login" });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("adminToken");
        res.status(200).json({ message: "Logout successful!" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

