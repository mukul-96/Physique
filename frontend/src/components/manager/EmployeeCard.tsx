import { Avatar } from "../Avatar";
import Accordion from "./Accordion";
import axios, { isAxiosError } from "axios";
import { BACKEND_URL } from "../../config";
import { useState } from "react";
import Spinner from "../Spinner";

interface EmployeeDetails {
  id: number;
  branchId: number;
  name: string;
  designation: string;
  salary: number;
  email:string;
  description?: string;
}

interface EmployeeCardProps {
  employee: EmployeeDetails;
  onEmployeeRemoved: () => void;
}

const EmployeeCard = ({ employee, onEmployeeRemoved }: EmployeeCardProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fireEmployeeHandler = async () => {
    const url = `${BACKEND_URL}manager/removestaff/${employee.id}`;
    const token = localStorage.getItem("authorization");
    
    try {
      setLoading(true);
      setError(null); 
      await axios.delete(url, {
        headers: {
          Authorization: token ? token : ""
        }
      });
      onEmployeeRemoved();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("An unexpected error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded w-full ">
      <Accordion
        header={
          <div className="flex flex-row w-full items-center justify-between ">
<div className="flex items-center gap-4 ">
          <div className="mt-3">    <Avatar name={employee.name} />
          </div>
  <h3 className="text-md font-bold text-gray-500 ">{employee.name}</h3>
</div>
<p className="text-md font-bold text-gray-500">{employee.designation}</p>
<p className="text-md font-bold text-gray-500"> {employee.email}</p> 
  <button onClick={fireEmployeeHandler} className="gradient-button"
              disabled={loading} >
              {loading ? <Spinner /> : "Fire"}
            </button>
      </div>

        
      }
      body={
        <>{error && <p className="text-red-500">{error}</p>} 
        <div className="flex flex-col gap-4">
        <p className="text-md font-bold text-gray-500 ">Description: {employee.description || "No description provided."}</p>
          <p className=" text-gray-500 text-md font-bold">Salary: ${employee.salary}</p>
        
        </div>
          </>
      }
      />
    </div>
  );
};

export default EmployeeCard;
