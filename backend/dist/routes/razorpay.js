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
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const razorPayRouter = (0, express_1.Router)();
const razorpayInstance = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});
razorPayRouter.post("/createOrder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, currency = "INR" } = req.body;
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}`,
        };
        const order = yield razorpayInstance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    }
    catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Failed to create order." });
    }
}));
razorPayRouter.post("/verifyPayment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto_1.default.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "");
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");
    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ success: true, message: "Payment verified successfully." });
    }
    else {
        res.status(400).json({ success: false, message: "Payment verification failed." });
    }
});
exports.default = razorPayRouter;
