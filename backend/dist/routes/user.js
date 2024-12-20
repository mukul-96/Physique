"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const edge_1 = require("@prisma/client/edge");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const dotenv_1 = __importDefault(require("dotenv"));
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const prisma = new edge_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
const userRouter = (0, express_1.Router)();
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ mssg: "Invalid ID" });
    }
    try {
        const user = yield prisma.user.findFirst({
            where: {
                id: id
            }, include: {
                memberships: true,
                enrolledIn: true
            }
        });
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json({ mssg: "User not found" });
        }
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ mssg: "Internal server error" });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const id = user.id;
        const token = jsonwebtoken_1.default.sign({ id }, secret);
        return res.status(200).json({ token: token, id: id });
    }
    catch (error) {
        //@ts-ignore
        console.log("Error response:", error.response, error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}));
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const existingUser = yield prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(403).json({
                message: "Email already exists"
            });
        }
        const newUser = yield prisma.user.create({
            data: {
                email: email,
                password: password,
                name: name
            }
        });
        const id = newUser.id;
        const token = jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}));
userRouter.post("/purchaseplan", userAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, branchId, planId } = req.body;
        const subscription = yield prisma.subscription.findFirst({
            where: {
                planId: parseInt(planId),
                branchId: parseInt(branchId)
            }
        });
        if (!subscription) {
            return res.status(404).json({
                message: "Subscription not found or is inactive for the specified branch."
            });
        }
        const branch = yield prisma.branches.findUnique({
            where: {
                id: parseInt(branchId)
            }
        });
        const user = yield prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        if (!branch) {
            return res.status(404).json({
                message: "Branch not found."
            });
        }
        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        if (branch.dailyFee) {
            const totalAmount = (branch.dailyFee) * subscription.days;
            const newBalance = user.balance + totalAmount;
            yield prisma.user.update({
                where: {
                    id: parseInt(userId)
                },
                data: {
                    balance: newBalance
                }
            });
            yield prisma.history.create({
                data: {
                    userId: parseInt(userId),
                    subscription: subscription.name,
                    branchId: parseInt(branchId),
                    date: new Date(),
                    price: subscription.price
                }
            });
            yield prisma.enrollment.create({
                data: {
                    userId: parseInt(userId),
                    subscriptionId: subscription.id
                }
            });
            yield prisma.branches.update({
                where: {
                    id: parseInt(branchId)
                },
                data: {
                    dailySales: branch.dailySales + 1
                }
            });
            return res.status(200).json({
                message: "Plan purchased successfully. Balance updated.",
                newBalance: newBalance
            });
        }
    }
    catch (error) {
        console.error("Error processing plan purchase:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}));
exports.default = userRouter;
