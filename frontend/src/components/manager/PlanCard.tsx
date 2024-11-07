// import { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../config";
// import Spinner from "../Spinner";
// import { FaCheckCircle } from 'react-icons/fa';
// import { getRazorpayOptions,createOrder,} from '../../razorpayConfig';
// import { useParams } from 'react-router-dom';

// import { toast } from 'react-toastify';

// interface PlanDetails {
//     name: string;
//     description: string;
//     price: number;
//     active: boolean;
//     days: number;
//     planId: number;
// }

// interface PlanCardProps {
//     plan: PlanDetails;
//     branchId: number | null;
// }

// export default function PlanCard({ plan, branchId }: PlanCardProps) {
//     const [isActive, setIsActive] = useState<boolean>(plan.active);
//     const [loading, setLoading] = useState(false);
//     const [toggleLoading, setToggleLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPrice, setCurrentPrice] = useState(plan.price);
//     const {role}=useParams();

//     const handleSubscribe = async () => {
//         try {
//             // Step 1: Create an order on your backend
//             const orderData = await createOrder(plan.price);  // Fetch the order from your backend
    
//             // Step 2: Define Razorpay options based on the backend order data
//             const options = getRazorpayOptions(orderData, plan.description, onPaymentSuccess, onPaymentFailure);
    
//             // Step 3: Call Razorpay's Checkout method directly (do not use `new`)
//             if (window.Razorpay) {
//                 window.Razorpay.Checkout(options); // Correct way to open Razorpay checkout
//             }
            
//         } catch (error) {
//             console.log(error);
//             toast.error("Failed to create the order. Please try again.");  // Show error if order creation fails
//         }
//     };
//     const onPaymentSuccess = () => {
//         toast.success("Payment successful! Thank you for your subscription.");  // Success toast
//     };

//     const onPaymentFailure = () => {
//         toast.error("Payment failed! Please try again.");  // Failure toast
//     };


//     const handleToggle = async () => {
//       try {
//           setToggleLoading(true);
//           setError(null);            
//           const token = localStorage.getItem("authorization");
//           if (!token) {
//               setError("Authorization token not found. Please log in again.");
//               return;
//           }
          
//           const url = `${BACKEND_URL}manager/toggleplan`;        
//           const response = await axios.put(url, {
//               planId: plan.planId,
//               branchId: branchId,
//               status: isActive,
//           }, {
//               headers: { Authorization: token },
//           });
  
//           if (response.data && response.data.active !== undefined) {
//               setIsActive(response.data.active);
//           } else {
//               console.log("No active status in response:", response.data);
//               setIsActive(prev => !prev); 
//           }
//       } catch (err) {
//           console.log("Error toggling plan:", err);
//           setError("Failed to toggle button: ");
//       } finally {
//           setToggleLoading(false);
//       }
//   };

//     const handleEditPrice = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const newPriceInput = prompt("Enter the new price for this plan:");

//             if (!newPriceInput) {
//                 setError("Price update canceled or invalid input provided.");
//                 return;
//             }
//             const newPrice = parseFloat(newPriceInput);

//             if (isNaN(newPrice) || newPrice <= 0) {
//                 setError("Invalid price entered. Please enter a valid positive number.");
//                 return;
//             }

//             const token = localStorage.getItem("authorization");
//             if (!token) {
//                 setError("Authorization token not found. Please log in again.");
//                 return;
//             }

//             const url = `${BACKEND_URL}manager/editplan`;
//             const response = await axios.put(
//                 url,
//                 {
//                     planId: plan.planId,
//                     branchId: branchId,
//                     price: newPrice,
//                 },
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 }
//             );

//             if (response.data && response.data.price !== undefined) {
//               setCurrentPrice(response.data.price);
//           } else {
//               console.log("No price in response:", response.data);
//               setCurrentPrice(newPrice);
//           }
//         } catch (err) {
//             setError("Failed to update price: " + err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="border shadow-lg rounded-lg w-full cursor-pointer">
//             {error && <div>{error}</div>}
//             <li className="relative bg-white border rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ">
//                 <div>
//                     <button
//                         onClick={handleToggle}
//                         className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
//                             isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                         }`}
//                     >
//                         {toggleLoading ? <Spinner /> : <span>{isActive ? 'Active' : 'Inactive'}</span>}
//                     </button>
//                 </div>

//                 <h3 className="mt-10 text-2xl font-bold text-custom-brown">{plan.name}</h3>

//                 <p className="text-3xl font-semibold text-custom-brown mt-2">
//                     ${currentPrice}
//                     <button
//                         onClick={handleEditPrice}
//                         className="ml-2 text-blue-500 text-base hover:text-blue-700 "
//                     >
//                         {loading ? "Processing" : "Edit"}
//                     </button>
//                 </p>
//                 <p className="text-gray-500 mb-4">for {plan.days} days</p>

//                 <hr className="my-4 border-gray-300" />

//                 <ul className="space-y-2">
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">Diet Plan</span>
//                     </li>
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">Personal Training</span>
//                     </li>
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">Equipment Access</span>
//                     </li>
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">24/7 Gym Access</span>
//                     </li>
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">Group Classes</span>
//                     </li>
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">Sauna & Spa Access</span>
//                     </li>
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">Locker Room</span>
//                     </li>
//                     <li className="flex items-center">
//                         <FaCheckCircle className="text-pink-500 text-lg mr-2" />
//                         <span className="text-gray-600">Free Parking</span>
//                     </li>
//                 </ul>
//                 {role==="user"?<div className='Subscribe-Btn w-full flex justify-center items-center mt-10'>
//                                 <button onClick={handleSubscribe}>Subscribe Now</button>
//                             </div>:""}
//             </li>
//         </div>
//     );
// }
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Spinner from "../Spinner";
import { FaCheckCircle } from 'react-icons/fa';

interface PlanDetails {
    name: string;
    description: string;
    price: number;
    active: boolean;
    days: number;
    planId: number;
}

interface PlanCardProps {
    plan: PlanDetails;
    branchId: number | null;
}

export default function PlanCard({ plan, branchId }: PlanCardProps) {
    const [isActive, setIsActive] = useState<boolean>(plan.active);
    const [loading, setLoading] = useState(false);
    const [toggleLoading, setToggleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPrice, setCurrentPrice] = useState(plan.price);

    
    const handleToggle = async () => {
        try {
            setToggleLoading(true);
            setError(null);
            const token = localStorage.getItem("authorization");
            if (!token) {
                setError("Authorization token not found. Please log in again.");
                return;
            }

            const url = `${BACKEND_URL}manager/toggleplan`;
            const response = await axios.put(
                url,
                {
                    planId: plan.planId,
                    branchId: branchId,
                    status: isActive,
                },
                {
                    headers: { Authorization: token },
                }
            );

            if (response.data && response.data.active !== undefined) {
                setIsActive(response.data.active);
            } else {
                console.log("No active status in response:", response.data);
                setIsActive(prev => !prev); 
            }
        } catch (err) {
            console.log("Error toggling plan:", err);
            setError("Failed to toggle button: ");
        } finally {
            setToggleLoading(false);
        }
    };

    const handleEditPrice = async () => {
        try {
            setLoading(true);
            setError(null);

            const newPriceInput = prompt("Enter the new price for this plan:");

            if (!newPriceInput) {
                setError("Price update canceled or invalid input provided.");
                return;
            }
            const newPrice = parseFloat(newPriceInput);

            if (isNaN(newPrice) || newPrice <= 0) {
                setError("Invalid price entered. Please enter a valid positive number.");
                return;
            }

            const token = localStorage.getItem("authorization");
            if (!token) {
                setError("Authorization token not found. Please log in again.");
                return;
            }

            const url = `${BACKEND_URL}manager/editplan`;
            const response = await axios.put(
                url,
                {
                    planId: plan.planId,
                    branchId: branchId,
                    price: newPrice,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.data && response.data.price !== undefined) {
                setCurrentPrice(response.data.price);
            } else {
                console.log("No price in response:", response.data);
                setCurrentPrice(newPrice);
            }
        } catch (err) {
            setError("Failed to update price: " + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border shadow-lg rounded-lg w-full cursor-pointer">
            {error && <div>{error}</div>}
            <li className="relative bg-white border rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div>
                    <button
                        onClick={handleToggle}
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                            isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                    >
                        {toggleLoading ? <Spinner /> : <span>{isActive ? 'Active' : 'Inactive'}</span>}
                    </button>
                </div>

                <h3 className="mt-10 text-2xl font-bold text-custom-brown">{plan.name}</h3>

                <p className="text-3xl font-semibold text-custom-brown mt-2">
                    ${currentPrice}
                    <button
                        onClick={handleEditPrice}
                        className="ml-2 text-blue-500 text-base hover:text-blue-700 "
                    >
                        {loading ? "Processing" : "Edit"}
                    </button>
                </p>
                <p className="text-gray-500 mb-4">for {plan.days} days</p>

                <hr className="my-4 border-gray-300" />

                <ul className="space-y-2">
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">Diet Plan</span>
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">Personal Training</span>
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">Equipment Access</span>
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">24/7 Gym Access</span>
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">Group Classes</span>
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">Sauna & Spa Access</span>
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">Locker Room</span>
                    </li>
                    <li className="flex items-center">
                        <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                        <span className="text-gray-600">Free Parking</span>
                    </li>
                </ul>
                
            </li>
        </div>
    );
}
