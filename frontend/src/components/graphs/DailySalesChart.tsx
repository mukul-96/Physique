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
  curYear: number;
  prevYear: number;
  curYearUsers: User[];
  prevYearUsers: User[];
  month: number;
}

export default function DailySalesChart({
  curYear,
  prevYear,
  curYearUsers,
  prevYearUsers,
  month,
}: CurAndPrevYearSalesProps) {
  const curYearData = countUsersByDay(curYearUsers, month, curYear);
  const prevYearData = countUsersByDay(prevYearUsers, month, prevYear);

  const daysInMonth = new Date(curYear, month, 0).getDate();
  const xLabels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: `${prevYear} Daily Sales`,
        data: prevYearData,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: `${curYear} Daily Sales`,
        data: curYearData,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
        fill: true,
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
          text: 'Days of the Month',
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

const countUsersByDay = (users: User[], month: number, year: number): number[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayCounts = Array(daysInMonth).fill(0);

  users.forEach((user) => {
    const date = new Date(user.date);
    if (date.getFullYear() === year && date.getMonth() + 1 === month) {
      const day = date.getDate() - 1;
      dayCounts[day] += 1;
    }
  });

  return dayCounts;
};
