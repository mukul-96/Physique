import { RAZORPAY_KEY_ID } from "./config";
import { BACKEND_URL } from "./config";
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
        const response = await fetch(`${BACKEND_URL}api/v1/razorpay/createOrder`, {
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
};export const getRazorpayOptions = (
    order: RazorpayOrder, 
    description: string,
    onSuccess: () => void, 
    onFailure: () => void
  ) => {
    return {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,  // Amount in the smallest currency unit (e.g., paise for INR)
      currency: order.currency,
      name: "PHYSIQUE",  // Your company or branch name
      description: description,
      order_id: order.id,
      image: "https://your-logo-url.com/logo.png",  // Optional: Your company's logo or image URL
      prefill: {
        name: "",  // Optionally prefill customer name
        email: "",  // Optionally prefill customer email
        contact: "",  // Optionally prefill customer phone number
      },
      notes: {
        address: "",  // Add the 'address' property (can be an empty string or an actual address)
        description: description,  // Optional: Additional notes to pass to Razorpay
      },
      handler: async function (response: RazorpayResponse) {
        try {
          const verificationResponse = await fetch(`${BACKEND_URL}api/v1/razorpay/verifyPayment`, {
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
        color: "#F37254",  // Optional: Razorpay checkout color theme
      },
    };
  };
  