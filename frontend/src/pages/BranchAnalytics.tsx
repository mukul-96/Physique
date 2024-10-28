import HeadExpense from "../components/head/HeadExpense";
import Navbar from "../components/head/Navbar";
import { useParams } from "react-router-dom";
import Analytics from "../components/Analytics";
import { useEffect, useState, useMemo } from "react";
import { useFetchBranchDetails } from "../hooks";

export default function BranchAnalytics() {
  const currentDate = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [salary, setSalary] = useState<number>(0);
  const { branchId } = useParams<{ branchId: string }>();
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const safeId = branchId || '';

  const { branchDetails, loading, error } = useFetchBranchDetails(safeId);

  const trainers = useMemo(() =>
    branchDetails?.staff.filter(staff => staff.designation === "Trainer") || [],
    [branchDetails]
  );

  useEffect(() => {
    const totalSalary = trainers.reduce((sum, trainer) => sum + trainer.salary, 0);
    setSalary(totalSalary);
  }, [trainers]);

  const handleTotalExpense = (expense: number) => {
    setTotalExpense(expense);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading branch details: {error}</div>;
  if (!branchDetails) return <div>No branch details available</div>;

  return (
    <div>
<div className="flex justify-center ">
<Navbar branchId={branchId} />

  </div>      <div className="flex items-center justify-between p-10">
        <div className="space-y-2">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Select Month:</label>
          <select
            id="month"
            className="w-40 p-2 mt-1 border border-gray-300 rounded-md"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
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
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <option key={i} value={currentDate.getFullYear() - i}>
                {currentDate.getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

    

      <Analytics branchId={branchId} month={month} year={year} totalExpense={totalExpense}  />
      <HeadExpense branchId={branchId} month={month} year={year} salary={salary} onTotalExpense={handleTotalExpense} />
    </div>
  );
}
