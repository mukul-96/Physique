import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement);

interface User {
  id: number;
  userId: number;
  subscription: string;
  branchId: number;
  date: string;
  price: number;
}

interface PieSubscriptionChartProps {
  curUsers: User[];
}

export default function PieSubscriptionChart({ curUsers }: PieSubscriptionChartProps) {
  const subscriptionCount = curUsers.reduce((acc, user) => {
    acc[user.subscription] = (acc[user.subscription] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalSubscriptions = Object.values(subscriptionCount).reduce((sum, count) => sum + count, 0);

  const chartData = {
    labels: Object.keys(subscriptionCount),
    datasets: [
      {
        data: Object.values(subscriptionCount),
        backgroundColor: [
          '#FF6384', 
          '#36A2EB', 
          '#FFCE56', 
          '#4BC0C0', 
                ],
        borderWidth: 1,
        hoverOffset: 10,
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
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalSubscriptions) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: 300, height: 300 }}>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}
