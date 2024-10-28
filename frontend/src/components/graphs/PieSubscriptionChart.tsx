import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

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

const sizing = {
    margin: { right: 5 },
    width: 250,
    height: 250,
    legend: { hidden: true },
};

export default function PieSubscriptionChart({ curUsers }: PieSubscriptionChartProps) {
    const subscriptionCount = curUsers.reduce((acc, user) => {
        acc[user.subscription] = (acc[user.subscription] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const totalSubscriptions = Object.values(subscriptionCount).reduce((sum, count) => sum + count, 0);
    const pieData = Object.entries(subscriptionCount).map(([subscription, count]) => ({
        id: subscription,
        label: `${subscription} (${((count / totalSubscriptions) * 100).toFixed(1)}%)`,
        value: count,
    }));

    return (
        <PieChart
            series={[
                {
                    outerRadius: 90,
                    innerRadius: 30,
                    data: pieData,
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
    );
}
