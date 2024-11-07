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
const managerAuth_1 = __importDefault(require("../middlewares/managerAuth"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const prisma = new edge_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
const managerRouter = (0, express_1.Router)();
managerRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const exist = yield prisma.managers.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        if (!exist) {
            return res.status(403).json({
                message: "Wrong email or password"
            });
        }
        const id = exist.id;
        const token = jsonwebtoken_1.default.sign({ id }, secret);
        return res.status(200).json({ token: token, id: id });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}));
managerRouter.get("/stafflist/:id", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ mssg: "Invalid ID" });
        }
        const staff = yield prisma.rooster.findMany({
            where: {
                branchId: id,
            }
        });
        if (!staff) {
            return res.status(404).json({ message: "Manager not found" });
        }
        return res.status(200).json(staff);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}));
managerRouter.get("/getdetails/:id", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ mssg: "Invalid ID" });
        }
        const manager = yield prisma.managers.findFirst({
            where: {
                id: id,
            }
        });
        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }
        return res.status(200).json(manager);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}));
managerRouter.get("/memberslist/:id", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const members = yield prisma.subscription.findMany({
            where: {
                branchId: id
            },
            include: {
                enrolled: {
                    include: {
                        user: true
                    }
                }
            }
        });
        res.status(200).json(members);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
managerRouter.post("/addstaff", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, designation, salary, description, branchId, email } = req.body;
    try {
        const exist = yield prisma.rooster.findFirst({
            where: {
                email: email
            }
        });
        if (exist) {
            return res.status(409).json({ message: "Employee with Email alreay exist" });
        }
        const newStaff = yield prisma.rooster.create({
            data: {
                name: name,
                designation: designation,
                salary: parseInt(salary),
                email: email,
                description: description,
                branchId: parseInt(branchId),
            }
        });
        return res.status(200).json({
            message: "staff added successfully",
            newStaff: newStaff
        });
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
managerRouter.delete("/removestaff/:id", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffId = (req.params.id);
    try {
        const deleteStaff = yield prisma.rooster.delete({
            where: {
                id: parseInt(staffId),
            },
        });
        return res.status(200).json({
            message: "staff deleted successfully",
            newStaff: deleteStaff
        });
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
managerRouter.get("/expenselist", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year, branchId } = req.query;
        if (!month || !year || !branchId) {
            return res.status(400).json({ message: "Missing required parameters" });
        }
        const data = yield prisma.utilities.findMany({
            where: {
                month: parseInt(month),
                year: parseInt(year),
                branchId: parseInt(branchId)
            }
        });
        if (data.length > 0) {
            return res.status(200).json(data);
        }
        else {
            return res.status(500).json({ message: "No data found" });
        }
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
managerRouter.post("/addexpense", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const { title, cost, branchId } = req.body;
    try {
        const utility = yield prisma.utilities.create({
            data: {
                title: title,
                cost: parseInt(cost),
                month: month,
                year: year,
                branchId: parseInt(branchId),
            },
        });
        return res.status(200).json({
            message: "expense added",
            utility: utility
        });
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
managerRouter.get("/branchplan/:id", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branchId = parseInt(req.params.id);
    try {
        const list = yield prisma.subscription.findMany({
            where: {
                branchId: branchId
            }
        });
        return res.status(200).json(list);
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
managerRouter.put("/toggleplan", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId, branchId, status } = req.body;
    try {
        const newPlan = yield prisma.subscription.updateMany({
            where: {
                planId: parseInt(planId),
                branchId: parseInt(branchId)
            },
            data: {
                active: !status
            }
        });
        return res.status(200).json(newPlan);
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
managerRouter.put("/editplan", managerAuth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId, branchId, price } = req.body;
    try {
        const newPlan = yield prisma.subscription.updateMany({
            where: {
                planId: parseInt(planId),
                branchId: parseInt(branchId)
            },
            data: {
                price: parseInt(price)
            }
        });
        return res.status(200).json({
            message: "plan edited successfully",
            newPlan: newPlan
        });
    }
    catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}));
managerRouter.get("/sales/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branchId = parseInt(req.params.id);
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        return res.status(400).json({ error: "Invalid month or year" });
    }
    try {
        const users = yield prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year}-${month}-01`),
                    lt: new Date(`${year}-${month + 1}-01`)
                }
            }
        });
        const sameMonthPrevYear = yield prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year - 1}-${month}-01`),
                    lt: new Date(`${year - 1}-${month + 1}-01`)
                }
            }
        });
        const curYearUsers = yield prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${year + 1}-01-01`)
                }
            }
        });
        const prevYearUsers = yield prisma.history.findMany({
            where: {
                branchId: branchId,
                date: {
                    gte: new Date(`${year - 1}-01-01`),
                    lt: new Date(`${year}-01-01`)
                }
            }
        });
        return res.status(200).json({
            users,
            sameMonthPrevYear,
            curYearUsers,
            prevYearUsers
        });
    }
    catch (error) {
        console.error("Error querying database:", error);
        return res.status(500).json({ error });
    }
}));
exports.default = managerRouter;
