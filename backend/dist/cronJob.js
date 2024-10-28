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
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Running daily fee deduction task');
    const users = yield prisma.user.findMany({
        where: { balance: { gt: 0 } }
    });
    const currentDateTime = new Date();
    users.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
}));
