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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cronRouter = express_1.default.Router();
const runDailyFeeDeduction = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Running daily fee deduction task');
    const users = yield prisma.user.findMany({
        where: { balance: { gt: 0 } }
    });
    const currentDateTime = new Date();
    for (const user of users) {
        const dailyFee = user.dailyFee;
        const lastCheckIn = user.checkedIn ? new Date(user.checkedIn) : null;
        const hasCheckedInToday = lastCheckIn && (currentDateTime.toDateString() === lastCheckIn.toDateString());
        if (!hasCheckedInToday && user.balance > 0) {
            const newBalance = user.balance - dailyFee;
            yield prisma.user.update({
                where: { id: user.id },
                data: {
                    balance: Math.max(newBalance, 0),
                }
            });
            console.log(`Deducted ${dailyFee} from user ${user.id}, new balance: ${newBalance}`);
        }
    }
});
cronRouter.get('/run', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield runDailyFeeDeduction();
        res.status(200).send('Cron job executed successfully');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error running cron job');
    }
}));
exports.default = cronRouter;
