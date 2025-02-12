import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface User {
  id: number;
  userId: number;
  subscription: string;
  branchId: number;
  date: string;
  price: number;
}

interface CurAndPrevYearSalesProps {
  curYearUsers: User[];
  prevYearUsers: User[];
  curYear: number;
  prevYear: number;
}

export default function CurAndPrevYearSales({
  curYearUsers,
  prevYearUsers,
  curYear,
  prevYear,
}: CurAndPrevYearSalesProps) {
  const curYearData = countUsersByMonth(curYearUsers);
  const prevYearData = countUsersByMonth(prevYearUsers);

  const xLabels = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: prevYear.toString(),
        data: prevYearData,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: curYear.toString(),
        data: curYearData,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'User Count',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

const countUsersByMonth = (users: User[]): number[] => {
  const monthCounts = Array(12).fill(0);

  users.forEach((user) => {
    const month = new Date(user.date).getMonth();
    monthCounts[month] += 1;
  });

  return monthCounts;
};
