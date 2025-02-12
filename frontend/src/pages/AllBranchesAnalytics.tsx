import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import Navbar from "../components/head/Navbar";
import YearlySubscriptionChart from "../components/YearlySubscriptionChart";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function EnhancedAnalytics() {
  const currentDate = new Date();
  const [totalBranches, setTotalBranches] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalYearlyRevenue, setTotalYearlyRevenue] = useState<number>(0);
  const [activeDailyUsers, setActiveDailyUsers] = useState<number>(0);
  const [branchComparison, setBranchComparison] = useState<any>(null);
  const [monthlySubscriptionTrends, setMonthlySubscriptionTrends] = useState<any>(null);
  const [yearlySubscriptionTrends, setYearlySubscriptionTrends] = useState<any>(null);
  const [yearlyComparison, setYearlyComparison] = useState<any>(null);
  const [history, setHistory] = useState<any>();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const token = localStorage.getItem("authorization");
  console.log(activeDailyUsers)
  const monthNames = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];
  const fetchAnalyticsData = async () => {
    try {
      const salesResponse = await fetch(
        `${BACKEND_URL}head/branch-sales?year=${year}&month=${month}`
      );
      if (!salesResponse.ok) throw new Error("Failed to fetch branch sales");
      const salesData = await salesResponse.json();

      const historyResponse = await fetch(
        `${BACKEND_URL}head/branch-history?year=${year}&month=${month}`
      );
      if (!historyResponse.ok) throw new Error("Failed to fetch branch history");
      const historyData = await historyResponse.json();

      const yearlySalesResponse = await fetch(
        `${BACKEND_URL}head/branch-sales-yearly?year=${year}`
      );
      if (!yearlySalesResponse.ok)
        throw new Error("Failed to fetch yearly branch sales");
      const yearlySalesData = await yearlySalesResponse.json();

      const yearlyHistoryResponse = await fetch(
        `${BACKEND_URL}head/branch-history-yearly?year=${year}`
      );
      if (!yearlyHistoryResponse.ok)
        throw new Error("Failed to fetch yearly history data");
      const yearlyHistoryData = await yearlyHistoryResponse.json();
      const yearlyRevenue = yearlyHistoryData.currentYear.data.reduce((acc, item) => {
        return acc + (item?.price && typeof item.price === "number" ? item.price : 0);
      }, 0);
      setTotalYearlyRevenue(yearlyRevenue);
      const information=await axios.get( `${BACKEND_URL}head/maininfo`,{ headers: {
        Authorization: token ?token : ""
      },
    params:{year}})
      if(information)
      {
        const {totalBranches,totalEmployees,totalSales}=information.data ;
        console.log(totalBranches,totalEmployees)
        setTotalBranches(totalBranches);
        setTotalEmployees(totalEmployees);
        setTotalSales(totalSales);
      }
      const branchNames = salesData.map((item) => item.branchName);
      const sales = salesData.map((item) => item.sales);
      setBranchComparison({
        labels: branchNames,
        datasets: [
          {
            label: "Monthly Branch Sales (₹)",
            data: sales,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      });

      const yearlyBranchNames = yearlySalesData.map((item) => item.branchName);
      const yearlySales = yearlySalesData.map((item) => item.sales);
      setYearlyComparison({
        labels: yearlyBranchNames,
        datasets: [
          {
            label: "Yearly Branch Sales (₹)",
            data: yearlySales,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
//@ts-ignore
      const monthlySubscriptions = historyData.reduce((acc, item) => {
        acc[item.subscription] = (acc[item.subscription] || 0) + 1;
        return acc;
      }, {});
      setMonthlySubscriptionTrends({
        labels: Object.keys(monthlySubscriptions),
        datasets: [
          {
            label: "Monthly Subscription Trends",
            data: Object.values(monthlySubscriptions),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
      if(yearlyHistoryData)
      {
        setHistory(yearlyHistoryData)
      }
      //@ts-ignore
      const yearlySubscriptions = yearlyHistoryData.currentYear.data.reduce((acc, item) => {
        acc[item.subscription] = (acc[item.subscription] || 0) + 1;
        return acc;
      }, {});
      setYearlySubscriptionTrends({
        labels: Object.keys(yearlySubscriptions),
        datasets: [
          {
            label: "Yearly Subscription Trends",
            data: Object.values(yearlySubscriptions),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });

      const total = historyData.reduce((acc: number, item: any) => {
        return acc + (item?.price && typeof item.price === "number" ? item.price : 0);
      }, 0);
      setTotalRevenue(total);

      const today = new Date().toISOString().split("T")[0];
      const activeUsers = historyData.filter(
        (item: any) => item.date.split("T")[0] === today && item.branch.dailyEntry > 0
      ).length;
      setActiveDailyUsers(activeUsers);
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [year, month]);

  return (
    <div className="p-4 bg-slate-50">
      <div className="flex justify-center mb-10 bg-white">
        <Navbar branchId={undefined} />
      </div>
      <div className="flex justify-between items-center mb-6 bg-slate-50">
        <h1 className="text-2xl font-bold"> Statistics</h1>
        <div className="flex space-x-4">
          <div className="space-y-2">
            <label htmlFor="month" className="text-sm font-medium text-gray-700 m-2">
              Month:
            </label>
            <select
              id="month"
              className="w-32 p-2 border border-gray-300 rounded-md"
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
            <label htmlFor="year" className="text-sm font-medium text-gray-700 m-2">
              Year:
            </label>
            <select
              id="year"
              className="w-32 p-2 border border-gray-300 rounded-md"
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Branches</p>
              <h3 className="text-2xl font-semibold mt-1">{totalBranches}</h3>
            </div>
            <span className="text-green-500 text-sm">+5%</span>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="font-medium">2 added</span>
            <span className="ml-2">this month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <h3 className="text-2xl font-semibold mt-1">{totalEmployees}</h3>
            </div>
            <span className="text-green-500 text-sm">+3%</span>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="font-medium">15 joined</span>
            <span className="ml-2">this month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Revenue For {monthNames[`${month-1}`]}</p>
              <h3 className="text-2xl font-semibold mt-1">₹{totalRevenue}</h3>
            </div>
            <span className="text-green-500 text-sm">+8.2%</span>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="font-medium">₹500k</span>
            <span className="ml-2">added this month</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Revenue For {year}</p>
              <h3 className="text-2xl font-semibold mt-1">₹{totalYearlyRevenue}</h3>
            </div>
            <span className="text-green-500 text-sm">+12.5%</span>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="font-medium">₹1.2M</span>
            <span className="ml-2">added this year</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-semibold mt-1">{totalSales}</h3>
            </div>
            <span className="text-green-500 text-sm">+12%</span>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span className="font-medium">200</span>
            <span className="ml-2">sold  today</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4"> Branch Revenue For {monthNames[`${month-1}`]}</h2>
          {branchComparison && (
            <Bar
              data={branchComparison}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>

        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4"> Branch Revenue For Year {year}</h2>
          {yearlyComparison && (
            <Bar
              data={yearlyComparison}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>

        {/* Monthly Pie Chart for Subscription Trends */}
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">{monthNames[`${month-1}`]} Subscription Trends</h2>
          {monthlySubscriptionTrends && (
            <Pie
              data={monthlySubscriptionTrends}
              options={{
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          )}
        </div>

        {/* Yearly Pie Chart for Subscription Trends */}
        <div className="p-4 border rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4"> Subscription Trends In {year}</h2>
          {yearlySubscriptionTrends && (
            <Pie
              data={yearlySubscriptionTrends}
              options={{
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          )}
        </div>
        <div>
          <YearlySubscriptionChart data={history}/>
        </div>
      </div>
    </div>
  );
}
