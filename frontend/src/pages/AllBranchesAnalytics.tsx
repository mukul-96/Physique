import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { BACKEND_URL } from "../config";
import Navbar from "../components/head/Navbar";

export default function AllBranchesAnalytics() {
  const currentDate = new Date();
  const branchId = null;
  const [chartData, setChartData] = useState<any>(null);
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());

  const fetchSalesData = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}head/branch-sales?year=${year}&month=${month}`
      );
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [year, month]);

  // Check if chartData is available before trying to map over it
  const data = chartData ? {
    labels: chartData.map((item: any) => item.branchName),
    datasets: [
      {
        label: `Total Sales for ${month}/${year} (₹)`,
        data: chartData.map((item: any) => item.sales),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  } : { labels: [], datasets: [] };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className='flex justify-center'>
        <Navbar branchId={branchId} />
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

      <h2 className="text-center font-bold text-xl mt-6 mb-4">
        Branch Sales for {month}/{year}
      </h2>

      {/* Render a loading message or chart */}
      <div className="p-4">
        {chartData ? (
          <Bar data={data} options={options} />
        ) : (
          <p className="text-center">Loading sales data...</p>
        )}
      </div>
    </div>
  );
}
