import HeadExpense from "../components/head/HeadExpense";
import Navbar from "../components/head/Navbar";
import { useParams } from "react-router-dom";
import Analytics from "../components/Analytics";
import { useEffect, useState, useMemo } from "react";
import { useFetchBranchDetails } from "../hooks";
import AnalyticsSkeleton from "../skeletons/AnalyticsSkeleton";


export default function BranchAnalytics() {
  const currentDate = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [salary, setSalary] = useState<number>(0);
  const  {id}  = useParams<{ id: string | undefined }>();
  const  {branchId}  = useParams<{ branchId: string | undefined }>();
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const  {role}  = useParams<{ role: string | undefined }>();
  console.log(id)
  const safeId: string | null = (id ||branchId)?? null;
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

  if (loading) return <div><AnalyticsSkeleton/></div>;
  if (error) return <div>Error loading branch details: {error}</div>;
  if (!branchDetails) return <div>No branch details available</div>;

  return (
    <div>
      <div className="flex justify-center">
        {role&&
        <Navbar branchId={safeId} />}
      </div>      
      <div className="flex flex-col md:flex-row items-center justify-between p-10 space-y-4 md:space-y-0">
        <div className="space-y-2 w-full md:w-auto">
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Select Month:</label>
          <select
            id="month"
            className="w-full md:w-40 p-2 mt-1 border border-gray-300 rounded-md"
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

        <div className="space-y-2 w-full md:w-auto">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Select Year:</label>
          <select
            id="year"
            className="w-full md:w-40 p-2 mt-1 border border-gray-300 rounded-md"
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

      <Analytics branchId={safeId} month={month} year={year} totalExpense={totalExpense} />
      <HeadExpense branchId={safeId ? Number(safeId) : null} month={month} year={year} salary={salary} onTotalExpense={handleTotalExpense} />
    </div>
  );
}


