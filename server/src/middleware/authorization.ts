import { Router, Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
require("dotenv").config();


module.exports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtToken = req.header("token");
        // console.log(jwtToken);
        if (!jwtToken) {
            return res.status(401).json({ message: "Token not found in headers" });
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret) as any;
        if (!payload) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Set the user property on the request object
        req.params = payload.user;
        req.body.user = payload.user

        // Continue to the next middleware or route handler
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
}
