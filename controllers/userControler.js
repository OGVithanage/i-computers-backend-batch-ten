import User from "../models/user.js";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
    try {
        const passwordHash = Bcrypt.hashSync(req.body.password, 12)

        const newUser = new User(
            {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: passwordHash
            }
        )

        await newUser.save()
        res.json({
            message: "User created sucsussfully..!"
        })
    } catch (err) {
        res.json({
            message: "Something went wrong"
        })
    }
}

export async function loginUser(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email
        })

        if (user == null) {
            res.status(401).json({
                message: "User not found"
            })
        } else {
            const isPasswordCorrect = Bcrypt.compareSync(req.body.password, user.password)

            if (isPasswordCorrect) {
                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image
                }
                const token = jwt.sign(payload, "tmp", {
                    expiresIn: "48h"
                });
                res.json({
                    token: token
                })
            } else {
                res.status(401).json({
                    message: "Invalid Credentials"
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went worng"
        })
    }
}

export default function isAdmin(req) {
    if (req.user == null) {
        return false
    }
    if (req.user.isAdmin) {
        return true
    } else {
        return false
    }
}