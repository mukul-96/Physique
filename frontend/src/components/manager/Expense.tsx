import { useEffect, useState } from "react";
import axios from "axios";
import AddExpense from "./AddExpense";
import ExpenseChart from "./ExpenseChart";
import { BACKEND_URL } from "../../config";
import ExpenseLogCard from "./ExpenseLogCard";

interface ExpenseProps {
  branchId: number | null;
  salary: number;
}

interface expenseDetails {
  title: string;
  cost: number;
}

export default function Expense({ branchId, salary }: ExpenseProps) {
  const [expenses, setExpenses] = useState<expenseDetails[]>([]);
  const [rent, setRent] = useState<number>(0);
  const [equipment, setEquipment] = useState<number>(0);
  const [utilities, setUtilities] = useState<number>(0);
  const [maintenance, setMaintenance] = useState<number>(0);
  const [miscellaneous, setMiscellaneous] = useState<number>(0);
  const [newExpense, setNewExpense] = useState<expenseDetails | null>(null);
  const [error, setError] = useState<string | null>("");
  const[loading,setLoading]=useState<boolean>(true)

  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());

  useEffect(() => {
    if (newExpense) {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }
  }, [newExpense]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const url = `${BACKEND_URL}manager/expenselist`;
        const token = localStorage.getItem("authorization");
        const res = await axios.get<expenseDetails[]>(url, {
          headers: {
            Authorization: token ? token : "",
          },
          params: { month: selectedMonth, year: selectedYear, branchId },
        });
        setExpenses(res.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log(error)
        setError( "No DATA AVAILABLE");
      }
    };
    if (branchId) {
      fetchExpenses();
    }
  }, [branchId, selectedMonth, selectedYear]);

  useEffect(() => {
    const calculateExpenses = () => {
      let totalRent = 0;
      let totalUtilities = 0;
      let totalEquipment = 0;
      let totalMaintenance = 0;
      let totalMiscellaneous = 0;

      for (let i = 0; i < expenses.length; i++) {
        const { title, cost } = expenses[i];
        if (title === "Rent") {
          totalRent += cost;
        } else if (title === "Utilities") {
          totalUtilities += cost;
        } else if (title === "Equipment") {
          totalEquipment += cost;
        } else if (title === "Maintenance") {
          totalMaintenance += cost;
        } else if (title === "Miscellaneous") {
          totalMiscellaneous += cost;
        }
      }

      setRent(totalRent);
      setUtilities(totalUtilities);
      setEquipment(totalEquipment);
      setMaintenance(totalMaintenance);
      setMiscellaneous(totalMiscellaneous);
    };

    if (expenses.length > 0) {
      calculateExpenses();
    }
  }, [expenses]);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Select Month:</label>
          <select
            id="month"
            className="w-40 p-2 mt-1 border border-gray-300 rounded-md"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Select Year:</label>
          <select
            id="year"
            className="w-40 p-2 mt-1 border border-gray-300 rounded-md"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <option key={i} value={currentDate.getFullYear() - i}>
                {currentDate.getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <p className="mt-4 text-lg font-semibold text-gray-800 flex justify-center w-full bg-yellow-100" >
        Total Expenses: {loading?"":(<span className="text-blue-600 text-xl mx-2">${rent + equipment + miscellaneous + maintenance + utilities + salary}</span>
      )}</p>

      <div className="flex justify-evenly">
      <div className="mt-6">
        <AddExpense branchId={branchId} setNewExpense={setNewExpense} />
      </div>

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
