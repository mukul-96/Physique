import  { Request, Response } from "express";
import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorPayRouter = Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

interface OrderRequest extends Request {
    body: {
        amount: number;
        currency?: string;
    };
}

razorPayRouter.post("/createOrder", async (req: OrderRequest, res: Response) => {
    try {
        const { amount, currency = "INR" } = req.body;

        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ success: false, message: "Failed to create order." });
    }
});

interface VerifyPaymentRequest extends Request {
    body: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    };
}

razorPayRouter.post("/verifyPayment", (req: VerifyPaymentRequest, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "");
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ success: true, message: "Payment verified successfully." });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed." });
    }
});

export default razorPayRouter;
