import { MouseEventHandler, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Spinner from "../Spinner";

interface expenseDetails {
  title: string;
  cost: number;
}

interface ExpenseProps {
  branchId: number | null;
  setNewExpense: (expense: expenseDetails) => void;
}

export default function AddExpense({ branchId, setNewExpense }: ExpenseProps) {
  const [category, setCategory] = useState<string>("Miscellaneous");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>("");
  const[loading,setLoading]=useState<boolean>(false)



  const categoryHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    setCategory(e.currentTarget.textContent || "");
  };

  const addExpenseHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      setError("Please enter a positive number for the amount.");

      return;
    }
    setLoading(true);

    setError(null);

    const token = localStorage.getItem("authorization");
    const url = `${BACKEND_URL}manager/addexpense`;

    try {
      const res = await axios.post(
        url,
        {
          title: category,
          cost: amount,
          branchId: branchId,
        },
        {
          headers: {
            Authorization: token ? token : "",
          },
        }
      );
      setNewExpense(res.data.utility);
    } catch (error) {
      setError("Error adding expense, please try again.");
      console.error("Error adding expense:", error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg w-96 mx-auto">
      <h2 className="text-lg font-bold mb-4">Add New Expense</h2>
      <form className="w-full" onSubmit={addExpenseHandler}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Category</label>
          <div className="flex flex-wrap gap-2">
            {["Rent", "Utilities", "Equipment", "Maintenance", "Miscellaneous"].map((item) => (
              <button
              key={item}
              type="button"
              onClick={categoryHandler}
              className={`px-4 py-2 rounded-lg border ${
                category === item ? "gradient-button text-white" : "bg-gray-200"
              } hover:bg-gradient-to-r hover:from-custom-blue hover:to-custom-blue2 hover:text-white transition`}
            >
              {item}
            </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block font-semibold mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="$1000"
            className="w-full  p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
            {   loading?<Spinner/> : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
