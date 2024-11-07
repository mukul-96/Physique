"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const head_1 = __importDefault(require("./routes/head"));
const manager_1 = __importDefault(require("./routes/manager"));
const user_1 = __importDefault(require("./routes/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const scanner_1 = __importDefault(require("./routes/scanner"));
const cronRouter_1 = __importDefault(require("./routes/cronRouter"));
const razorpay_1 = __importDefault(require("./routes/razorpay"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: ['https://physique-client.vercel.app', `http://localhost:5173`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/manager", manager_1.default);
app.use("/api/v1/head", head_1.default);
app.use("/api/v1/scanner", scanner_1.default);
app.use("/api/v1/cron", cronRouter_1.default);
app.use("/api/razorpay", razorpay_1.default);
app.get('/', (req, res) => {
    res.send('<h1>Server is running</h1><p>Your backend is successfully deployed on Vercel!</p>');
});
app.listen(process.env.PORT, () => {
    console.log('Server is running');
});
