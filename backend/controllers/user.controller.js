import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Readable } from "stream";

import streamifier from "streamifier";

export const register = async (req, res) => {
    try {
        const { fullname, email, collegeemail, phonenumber, pw, role } = req.body;

        if (!fullname || !email || !phonenumber || !pw || !role) {
            return res.status(400).json({
                message: "Required fields are missing",
                success: false
            });
        }

        if (role.toLowerCase() === "student" && !collegeemail) {
            return res.status(400).json({
                message: "College email is required for students",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists",
                success: false
            });
        }

        const hashedpw = await bcrypt.hash(pw, 10);

        let profilePhotoUrl = null;
        let resumeUrl = null;
        let resumeOriginalName = null;

        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "auto"
                }
            );

            resumeUrl = cloudResponse.secure_url;
            resumeOriginalName = req.file.originalname;
        }

        const newUser = await User.create({
            fullname,
            email,
            phonenumber,
            pw: hashedpw,
            role,
            ...(role.toLowerCase() === "student" && { collegeemail }),
            profile: {
                profilePhoto: profilePhotoUrl,
                resume: resumeUrl,
                resumeOriginalName
            }
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: newUser
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



export const login = async (req, res) => {
    try {
        const { email, pw, role } = req.body;

        if (!email || !pw || !role) {
            return res.status(400).json({
                message: "Something's missing",
                success: false
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const pwMatch = await bcrypt.compare(pw, user.pw);
        if (!pwMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Email with this role doesn't exist",
                success: false
            });
        }

        const tokendata = { userId: user._id };
        const token = jwt.sign(tokendata, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back, ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;
        const userId = req.id;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // basic fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
        if (bio) user.profile.bio = bio;

        if (skills) {
            user.profile.skills = Array.isArray(skills)
                ? skills
                : skills.split(",").map(skill => skill.trim());
        }

        // ✅ FILE IS OPTIONAL
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });

    } catch (error) {
        console.log("Update profile error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
