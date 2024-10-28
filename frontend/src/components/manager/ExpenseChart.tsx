import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

interface ExpenseChartProps {
  rent: number;
  utilities: number;
  equipment: number;
  maintenance: number;
  miscellaneous: number;
  salary: number;
}

const sizing = {
  margin: { right: 5 },
  width: 250,
  height: 250,
  legend: { hidden: true },
};

export default function ExpenseChart({
  rent,
  utilities,
  equipment,
  maintenance,
  miscellaneous,
  salary,
}: ExpenseChartProps) {
  
  const data = [
    { label: 'Rent', value: rent, color: '#0088FE' },
    { label: 'Utilities', value: utilities, color: '#00C49F' },
    { label: 'Equipment', value: equipment, color: '#FF8042' },
    { label: 'Maintenance', value: maintenance, color: '#FFBB28' },
    { label: 'Miscellaneous', value: miscellaneous, color: '#A3E4D7' },
    { label: 'Salary', value: salary, color: '#FF6347' },
  ];

  return (
    <div className="flex  items-center">
      <PieChart
        series={[
          {
            outerRadius: 90,
            innerRadius: 30,
            data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'black',
            fontSize: 14,
            textAnchor: 'middle',
          },
        }}
        {...sizing}
      />

      <div className="mt-4">
        {data.map((item) => (
          <div key={item.label} className="flex items-center">
            <div
              style={{ backgroundColor: item.color }}
              className="w-4 h-4  mr-2"
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
