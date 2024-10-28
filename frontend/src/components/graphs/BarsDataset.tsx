import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

interface DatasetEntry {
  month: number; 
  [key: string]: number;
}

const chartSetting = {
  yAxis: [{ label: 'Subscription Count' }],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

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

  return (
    <div>
      <h3>{title}</h3>
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month', label: 'Month' }]}
        series={subscriptionTypes.map((type) => ({
          dataKey: type,
          label: type.charAt(0).toUpperCase() + type.slice(1),
          valueFormatter: (value: number | null) => (value !== null ? value.toString() : '0'), // Fallback to '0' if null
          color: subscriptionColors[type as keyof typeof subscriptionColors] || '#8884d8',
        }))}
        {...chartSetting}
      />
    </div>
  );
}
