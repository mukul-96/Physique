import { RAZORPAY_KEY_ID } from "./config";
import { BACKEND_URL } from "./config";
import Logo from "../src/images/logo/logo1.svg";
import axios from "axios";
import { toast } from "react-toastify";


interface RazorpayOrder {
    id: string;
    amount: number;
    currency: string;
}
interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
            console.log("Razorpay script loaded successfully.");
            resolve(true);
        };
        script.onerror = () => {
            console.error("Failed to load Razorpay script.");
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const createOrder = async (amount: number) => {
    try {
        const response = await fetch(`${BACKEND_URL}razorpay/createOrder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount, currency: "INR" }),
        });

        const data = await response.json();
        if (data.success) {
            return data.order;
        } else {
            throw new Error("Failed to create order");
        }
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        throw error;
    }
};

export const getRazorpayOptions = (
    order: RazorpayOrder, 
    description: string,
    onSuccess: () => void, 
    onFailure: () => void,
    planId: number , 
    branchId: string, 
    userId: string |undefined 
) => {
    return {
        key: RAZORPAY_KEY_ID,
        amount: order.amount, 
        currency: order.currency,
        name: "PHYSIQUE",  
        description: description,
        order_id: order.id,
        image: Logo,
        prefill: {
            name: "",  
            email: "",  
            contact: "",  
        },
        notes: {
            address: "", 
            description: description,  
        },
        handler: async function (response: RazorpayResponse) {
            try {
                const verificationResponse = await fetch(`${BACKEND_URL}razorpay/verifyPayment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }),
                });

                const result = await verificationResponse.json();
                if (result.success) {
                    console.log("success")
                    if(planId && branchId && userId){
                        console.log("called performpurchase")
                    await performPurchase(planId, branchId, userId);
                    }
                    onSuccess();
                } else {
                    onFailure();
                }
            } catch (error) {
                console.error("Payment verification error:", error);
                onFailure();
            }
        },
        theme: {
            color: "",  
        },
    };
};


const performPurchase = async (planId: number, branchId: string, userId: string, ) => {
    try {
        const token=localStorage.getItem('authorization')||localStorage.getItem('token')
        const response = await axios.post(
            `${BACKEND_URL}user/purchaseplan`,
            {
                planId: planId,
                branchId: parseInt(branchId),
                userId: parseInt(userId),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
            }
        );

        if (response.data.success) {
            toast.success("Plan purchased successfully!");
            console.log("Plan purchase successful:", response.data);
          } else {
            toast.error(`Failed to purchase plan: ${response.data.message}`);
            console.error("Failed to purchase plan:", response.data.message);
          }
        } catch (error) {
          toast.error("Error purchasing plan. Please try again later.");
          console.error("Error purchasing plan:", error);
        }
};
