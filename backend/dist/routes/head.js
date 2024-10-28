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
const headAuth_1 = __importDefault(require("../middlewares/headAuth"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const prisma = new edge_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
const headRouter = (0, express_1.Router)();
headRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const head = yield prisma.head.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if (!head) {
            return res.status(403).json({ message: "Wrong email or password" });
        }
        const id = head.id;
        const token = jsonwebtoken_1.default.sign({ id }, secret);
        return res.status(200).json({ token: token });
    }
    catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
headRouter.get("/branchPlan", headAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brachId } = req.body;
    const list = yield prisma.subscription.findMany({
        where: {
            branchId: brachId
        }
    });
    return res.status(200).json({
        list: list
    });
}));
const addSubscription = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    const plans = yield prisma.plans.findMany();
    const subscription = plans.map(plan => ({
        name: plan.name,
        description: plan.description,
        price: 0,
        branchId: branchId,
        planId: plan.id,
        days: plan.days
    }));
    yield prisma.subscription.createMany({ data: subscription });
});
headRouter.post("/addbranch", headAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchName, branchAddress, managerEmail, managerPassword, managerName, branchId } = req.body;
    let newManager;
    let newBranch;
    try {
        if (managerEmail && managerPassword && managerName) {
            const exist = yield prisma.managers.findFirst({
                where: { email: managerEmail }
            });
            if (exist) {
                return res.status(403).json({
                    message: "Manager Email already exists"
                });
            }
            newManager = yield prisma.managers.create({
                data: {
                    email: managerEmail,
                    password: managerPassword,
                    name: managerName,
                    branchId: parseInt(branchId)
                }
            });
        }
        const newScanner = yield prisma.authorizedScanners.create({
            data: {
                scannerName: branchName,
                branchId: branchId
            }
        });
        newBranch = yield prisma.branches.create({
            data: {
                name: branchName,
                address: branchAddress,
                managerId: newManager ? newManager.id : null,
                scanner: { connect: { id: newScanner.id } }
            }
        });
        if (newManager) {
            yield prisma.managers.update({
                where: { id: newManager.id },
                data: { branchId: newBranch.id }
            });
        }
        addSubscription(newBranch.id);
        return res.status(200).json({
            message: "Branch and manager created successfully",
            branch: newBranch,
            manager: newManager || null
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while creating the branch." });
    }
}));
headRouter.post("/addplan", headAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, days } = req.body;
    try {
        const newPlan = yield prisma.plans.create({
            data: {
                name: name,
                description: description,
                days: days
            }
        });
        const branches = yield prisma.branches.findMany();
        const subscriptions = branches.map(branch => ({
            name: newPlan.name,
            description: newPlan.description,
            price: 0,
            branchId: branch.id,
            planId: newPlan.id,
            days: days
        }));
        yield prisma.subscription.createMany({
            data: subscriptions,
        });
        return res.status(200).json({
            message: "plan added successfully",
            newPlan: newPlan
        });
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
headRouter.delete("/removeplan", headAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId } = req.body;
    try {
        yield prisma.plans
            .delete({
            where: {
                id: planId,
            }
        });
        return res.status(200).json({
            message: "plan removed successfully"
        });
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
headRouter.post("/addManager", headAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name, branchId } = req.body;
        const existingManager = yield prisma.managers.findFirst({
            where: {
                email: email
            }
        });
        if (existingManager) {
            return res.status(403).json({
                message: "Email already exists"
            });
        }
        const existingBranch = yield prisma.branches.findUnique({
            where: {
                id: branchId
            }
        });
        if (!existingBranch) {
            return res.status(404).json({
                message: "Branch not found"
            });
        }
        const newManager = yield prisma.managers.create({
            data: {
                email: email,
                password: password,
                name: name,
                branchId: branchId
            }
        });
        yield prisma.branches.update({
            where: {
                id: branchId,
            },
            data: {
                managerId: newManager.id,
            }
        });
        return res.status(200).json({
            message: "Successfully Added Manager",
            manager: newManager
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        });
    }
}));
headRouter.get("/branches", headAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.branches.findMany();
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
headRouter.get("/branch/:id", headAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield prisma.branches.findUnique({
            where: {
                id: id
            },
            include: {
                staff: true,
                expenditure: true,
                plans: true,
                reviews: true,
                manager: true
            }
        });
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(400).json(error);
    }
}));
exports.default = headRouter;
