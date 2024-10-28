import { useState } from "react";
import { BACKEND_URL } from "../../config";
import { useParams } from "react-router-dom";
import axios,{isAxiosError} from "axios";
import Spinner from "../Spinner";
interface AddEmployeeCardProps {
    onEmployeeAdded: () => void;
  }
function AddEmployeeCard({ onEmployeeAdded }: AddEmployeeCardProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setdesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const[error,setError]=useState<string|null>(null)
  const[loading,setLoading]=useState<boolean>(false)

  const branchId=useParams().id;
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const name=firstName+" "+lastName;
    const token=localStorage.getItem("authorization");
    const url=`${BACKEND_URL}manager/addstaff`;
    try {
        setLoading(true);
            await axios.post(url,{name,salary,designation,description,branchId,email},{
            headers:{
                Authorization:token?token:""
            }
        })
        onEmployeeAdded();
    } catch (error:unknown) {
        if (isAxiosError(error)) {
            if (error.response?.status === 409) {
                setError(error.message);

              } else {
                setError("An unexpected error occurred.");
            }
        } else {
            setError("An unknown error occurred.");
        }
    
    }
    finally
    {
        setError(null)
        setLoading(false);
    }
    
    
};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-orange-700 font-bold mb-2">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.toUpperCase())}
              required
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-orange-700 font-bold mb-2">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.toUpperCase())}
              required
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-orange-700 font-bold mb-2">Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-orange-700 font-bold mb-2">designation:</label>
          <select
            value={designation}
            onChange={(e) => setdesignation(e.target.value)}
            required
            className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select a designation</option>
            <option value="Trainer">Trainer</option>
            <option value="Cleaning Staff">Cleaning Staff</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {designation === "Other" && (
          <div className="mb-4">
            <label className="block text-orange-700 font-bold mb-2">Custom designation:</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setdesignation(e.target.value)}
              required
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-orange-700 font-bold mb-2">Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-orange-700 font-bold mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
            {loading?<Spinner></Spinner>:"Add Employee"}
        </button>
      </form>
    </div>
  );
}

export default AddEmployeeCard;
