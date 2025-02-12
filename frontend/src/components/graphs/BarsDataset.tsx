import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DatasetEntry {
  month: number;
  [key: string]: number;
}

interface BarsDatasetProps {
  dataset: DatasetEntry[];
  title: string;
}

export default function BarsDataset({ dataset, title }: BarsDatasetProps) {
  const subscriptionColors: Record<string, string> = {
    Gold: '#FFD700',
    Platinum: '#c0c0c0',
    Bronze: '#CD7F32',
  };

  const subscriptionTypes = Object.keys(dataset[0]).filter((key) => key !== 'month');

  const chartData = {
    labels: dataset.map((entry) => `Month ${entry.month}`), 
    datasets: subscriptionTypes.map((type) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      data: dataset.map((entry) => entry[type] || 0),
      backgroundColor: subscriptionColors[type as keyof typeof subscriptionColors] || '#8884d8',
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Subscription Count',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>{title}</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
