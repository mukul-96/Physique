import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import ExpenseChart from "../manager/ExpenseChart";
import ExpenseLogCard from "../manager/ExpenseLogCard";

interface ExpenseProps {
  branchId: number | null;
  salary: number;
  month: number;
  year: number;
  onTotalExpense: (expense: number) => void; 
}

interface expenseDetails {
  title: string;
  cost: number;
}

export default function HeadExpense({ branchId, salary, month, year, onTotalExpense }: ExpenseProps) {
  const [expenses, setExpenses] = useState<expenseDetails[]>([]);
  const [rent, setRent] = useState<number>(0);
  const [equipment, setEquipment] = useState<number>(0);
  const [utilities, setUtilities] = useState<number>(0);
  const [maintenance, setMaintenance] = useState<number>(0);
  const [miscellaneous, setMiscellaneous] = useState<number>(0);
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const url = `${BACKEND_URL}manager/expenselist`;
        const token = localStorage.getItem("authorization");
        const res = await axios.get<expenseDetails[]>(url, {
          headers: { Authorization: token ? token : "" },
          params: { month: month, year: year, branchId },
        });
        setExpenses(res.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("No DATA AVAILABLE");
      }
    };

    if (branchId) {
      fetchExpenses();
    }
  }, [branchId, month, year]);

  useEffect(() => {
    const calculateExpenses = () => {
      let totalRent = 0;
      let totalUtilities = 0;
      let totalEquipment = 0;
      let totalMaintenance = 0;
      let totalMiscellaneous = 0;

      for (let i = 0; i < expenses.length; i++) {
        const { title, cost } = expenses[i];
        if (title === "Rent") totalRent += cost;
        else if (title === "Utilities") totalUtilities += cost;
        else if (title === "Equipment") totalEquipment += cost;
        else if (title === "Maintenance") totalMaintenance += cost;
        else if (title === "Miscellaneous") totalMiscellaneous += cost;
      }

      setRent(totalRent);
      setUtilities(totalUtilities);
      setEquipment(totalEquipment);
      setMaintenance(totalMaintenance);
      setMiscellaneous(totalMiscellaneous);

      const totalExpense = totalRent + totalUtilities + totalEquipment + totalMaintenance + totalMiscellaneous + salary;
      onTotalExpense(totalExpense); 
    };

    if (expenses.length > 0) {
      calculateExpenses();
    }
  }, [expenses, salary, onTotalExpense]);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <p className="mt-4 text-lg font-semibold text-gray-800 flex justify-center w-full bg-yellow-100">
        Total Expenses: {loading ? "" : (<span className="text-blue-600 text-xl mx-2">${rent + equipment + miscellaneous + maintenance + utilities + salary}</span>)}
      </p>

      <div className="mt-6">
        <ExpenseChart
          rent={rent}
          utilities={utilities}
          equipment={equipment}
          maintenance={maintenance}
          miscellaneous={miscellaneous}
          salary={salary}
        />
      </div>

      <div className="mt-6">
        {expenses.length > 0 ? (
          <ExpenseLogCard expenses={expenses} />
        ) : (
          <p className="text-center text-gray-600">No expenses to display</p>
        )}
      </div>
    </div>
  );
}
