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
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const scannerRouter = (0, express_1.Router)();
scannerRouter.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scanners = yield prisma.authorizedScanners.findMany();
    if (scanners) {
        return res.status(200).json(scanners);
    }
    return res.status(500).json({ "message": "something went wrong" });
}));
scannerRouter.put('/scan/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branchId = req.params.id;
    console.log("Branch ID:", branchId);
    const qrDataString = req.body.qrData;
    let qrData;
    try {
        qrData = JSON.parse(qrDataString);
    }
    catch (error) {
        console.error("Invalid QR data format:", error);
        return res.status(400).json({ message: 'Invalid QR data format' });
    }
    const { id: userId } = qrData;
    try {
        const branch = yield prisma.branches.findUnique({
            where: { id: parseInt(branchId) }
        });
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        const dailyFee = branch.dailyFee;
        const user = yield prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const lastCheckIn = user.checkedIn ? new Date(user.checkedIn) : null;
        const currentDateTime = new Date();
        if (lastCheckIn && (currentDateTime.getTime() - lastCheckIn.getTime()) < 2 * 60 * 60 * 1000) {
            return res.status(400).json({ message: 'You cannot check in again within 2 hours' });
        }
        if (user.balance < dailyFee) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        const updatedUser = yield prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                balance: user.balance - dailyFee,
                checkedIn: currentDateTime
            }
        });
        const updatedBranch = yield prisma.branches.update({
            where: { id: parseInt(branchId) },
            data: {
                dailyEntry: branch.dailyEntry + 1,
            }
        });
        return res.status(200).json({
            message: 'Check-in successful, daily fee deducted',
            user: updatedUser,
            branch: updatedBranch,
        });
    }
    catch (error) {
        console.error("Error processing scan:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
// scannerRouter.put('/scan/:id', async (req: Request, res: Response) => {
//     console.log("Incoming request to scan endpoint");
//     const branchId = req.params.id;
//     console.log("Branch ID:", branchId);
//     const qrDataString = req.body.qrData;  
//     let qrData;
//     try {
//         qrData = JSON.parse(qrDataString);
//     } catch (error) {
//         return res.status(400).json({ message: 'Invalid QR data format' });
//     }
//     const { id: userId } = qrData;  
//     try {
//         const branch = await prisma.branches.findUnique({
//             where: { id: parseInt(branchId) }
//         });
//         if (!branch) {
//             return res.status(404).json({ message: 'Branch not found' });
//         }
//         const dailyFee = branch.dailyFee;
//         const user = await prisma.user.findUnique({
//             where: { id: parseInt(userId) }
//         });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const lastCheckIn = user.checkedIn ? new Date(user.checkedIn) : null;
//         const currentDateTime = new Date(); 
//         if (lastCheckIn && (currentDateTime.getTime() - lastCheckIn.getTime()) < 2 * 60 * 60 * 1000) {
//             return res.status(400).json({ message: 'You cannot check in again within 2 hours' });
//         }
//         if (user.balance < dailyFee) {
//             return res.status(400).json({ message: 'Insufficient balance' });
//         }
//         const updatedUser = await prisma.user.update({
//             where: { id: parseInt(userId) },
//             data: {
//                 balance: user.balance - dailyFee,
//                 checkedIn: currentDateTime
//             }
//         });
//         try {
//             const branchIdParsed = parseInt(branchId);
//             if (isNaN(branchIdParsed)) {
//                 throw new Error("Invalid branch ID");
//             }
//             const branch = await prisma.branches.findUnique({
//                 where: {
//                     id: branchIdParsed,
//                 },
//             });
//             if (!branch) {
//                 throw new Error("Branch not found");
//             }
//             const updatedBranch = await prisma.branches.update({
//                 where: {
//                     id: branchIdParsed,
//                 },
//                 data: {
//                     dailyEntry: branch.dailyEntry + 1, 
//                 },
//             });
//         return res.status(200).json({
//             message: 'Check-in successful, daily fee deducted',
//             user: updatedUser
//         });
//     } catch (error) {
//         console.error("Error processing scan:", error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// })}
exports.default = scannerRouter;
