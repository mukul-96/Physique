
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Spinner from "../Spinner";

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
    branchId:number|null
  }
export default function PlanCard({ plan,branchId }: PlanCardProps) {
    const [isActive, setIsActive] = useState(plan.active);
    const [loading,setLoading]=useState(false);
    const [toggleLoading,setToggleLoading]=useState(false);
    const [error,setError]=useState<string|null>(null);
  
    const handleToggle = async() => {

        try {
            setToggleLoading(true);
            setError(null);            
                        const token = localStorage.getItem("authorization");
            if (!token) {
              setError("Authorization token not found. Please log in again.");
              setLoading(false);
              return;
            }
        
            const url = `${BACKEND_URL}manager/toggleplan`;
            console.log(url)
        
             await axios.put(
              url,
              {
                planId: plan.planId,
                branchId: branchId,
                status:isActive
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            setIsActive(!isActive);
    
          } catch (err) {
            console.log(err)
            setError("Failed to toggle button"+err);

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
          setLoading(false);
          return;
        }
            const newPrice = parseFloat(newPriceInput);
    
        if (isNaN(newPrice) || newPrice <= 0) {
          setError("Invalid price entered. Please enter a valid positive number.");
          setLoading(false);
          return;
        }
        const token = localStorage.getItem("authorization");
        if (!token) {
          setError("Authorization token not found. Please log in again.");
          setLoading(false);
          return;
        }
    
        const url = `${BACKEND_URL}manager/editplan`;
    
         await axios.put(
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
      } catch (err) {
        setError("Failed to update price"+err);

       
      } finally {
        setLoading(false);
      }
    };
    
  
    return (
      <div
        className="border shadow-lg rounded-lg w-full cursor-pointer overflow-hidden transition-transform transform hover:scale-105">

        {error && <div>{error}</div>}
        <div className={`p-4 ${isActive ? 'bg-green-500' : 'bg-purple-500'}`}>
          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        </div>
  
        <div className="bg-black p-4 text-white relative">
          <div className="mb-2">
            <p className="font-semibold">Features:</p>
            <ul className="list-disc list-inside text-sm">
              <li>Access to all equipment</li>
              <li>Free fitness consultation</li>
              <li>Group classes included</li>
              <li>Open 24/7</li>
            </ul>
          </div>
  
          <p className="text-lg font-bold">Price: ${plan.price}</p>
  
        
          <div className="flex justify-between mt-4">
            <button
              onClick={handleEditPrice}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors duration-200"
            >
                    {loading?<Spinner></Spinner>:"Edit Price"}
            </button>
            <button
              onClick={handleToggle}
              className={`flex items-center space-x-1 px-4 py-2 rounded ${
                isActive ? 'bg-green-700' : 'bg-red-700'
              } text-white text-sm hover:bg-opacity-80 transition-colors duration-200`}
            >
              <span
                className={`h-3 w-3 rounded-full ${
                  isActive ? 'bg-green-300' : 'bg-red-300'
                }`}
              />
                                  {toggleLoading?<Spinner></Spinner>:<span>{isActive ? 'Active' : 'Inactive'}</span>}

              
            </button>
          </div>
        </div>
      </div>
    );
  }
  