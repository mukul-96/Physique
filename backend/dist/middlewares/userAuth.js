"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const userAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization header is missing or invalid"
        });
    }
    const token = auth.split(" ")[1];
    try {
        const response = jsonwebtoken_1.default.verify(token, secret);
        if (response) {
            req.user = response;
            next();
        }
    }
    catch (e) {
        return res.status(401).json({
            message: "Authentication failed: " + e
        });
    }
};
exports.default = userAuth;
