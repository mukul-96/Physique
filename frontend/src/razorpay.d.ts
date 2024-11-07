declare global {
    interface RazorpayOptions {
        key: string;
        amount: number;
        currency: string;
        name: string;
        description: string;
        image: string;
        order_id: string;
        handler: (response: RazorpayPaymentResponse) => void;
        prefill: {
            name: string;
            email: string;
            contact: string;
        };
        notes: {
            address: string;
        };
    }

    interface RazorpayPaymentResponse {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }

    interface Window {
        Razorpay: {
            Checkout(options: RazorpayOptions): void;
        }; 
    }
}

export {};
