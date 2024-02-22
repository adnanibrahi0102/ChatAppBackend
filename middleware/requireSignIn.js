import Jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.cookies.JWT
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized access - no token provided"
            })
        }

        const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized access - invalid token"
            })
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        })
    }
}

export default requireSignIn;
