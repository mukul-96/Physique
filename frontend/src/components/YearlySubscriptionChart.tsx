import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface SubscriptionData {
  currentYear: { year: number; data: Array<{ date: string }> };
  previousYear: { year: number; data: Array<{ date: string }> };
}

const YearlySubscriptionChart = ({ data }: { data: SubscriptionData | null }) => {
  if (!data || !data.currentYear || !data.previousYear) {
    return (
      <div className="text-center text-red-500">
        <p>Data is unavailable or incomplete. Please check the input data.</p>
      </div>
    );
  }

  const aggregateMonthlySubscriptions = (dataArray: any[]) => {
    const monthlyCounts = Array(12).fill(0); 
    dataArray.forEach((item: any) => {
      const date = new Date(item.date); 
      const month = date.getMonth(); 
      monthlyCounts[month] += 1; 
    });
    return monthlyCounts;
  };

  const currentYearData = aggregateMonthlySubscriptions(data.currentYear.data);
  const previousYearData = aggregateMonthlySubscriptions(data.previousYear.data);

  const chartData = {
    labels: [
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
      "December",
    ],
    datasets: [
      {
        label: `Subscriptions Sold (${data.currentYear.year})`,
        data: currentYearData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, 
      },
      {
        label: `Subscriptions Sold (${data.previousYear.year})`,
        data: previousYearData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4, // Curve the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `Subscriptions: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Subscriptions",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Yearly Subscriptions Comparison
      </h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default YearlySubscriptionChart;
