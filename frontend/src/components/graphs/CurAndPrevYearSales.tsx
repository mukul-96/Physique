import { LineChart } from '@mui/x-charts/LineChart';

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

export default function CurAndPrevYearSales({ curYearUsers, prevYearUsers, curYear, prevYear }: CurAndPrevYearSalesProps) {
    const curYearData = countUsersByMonth(curYearUsers);
    const prevYearData = countUsersByMonth(prevYearUsers);

    const xLabels = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <LineChart
            width={500}
            height={300}
            series={[
                { data: prevYearData, label: prevYear.toString() },
                { data: curYearData, label: curYear.toString() },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
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
