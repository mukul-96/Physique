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
    curYear: number;
    prevYear: number;
    curYearUsers: User[];
    prevYearUsers: User[];
    month: number;
}

export default function CurAndPrevYearSales({ curYear, prevYear, curYearUsers, prevYearUsers, month }: CurAndPrevYearSalesProps) {
    const curYearData = countUsersByDay(curYearUsers, month, curYear);
    const prevYearData = countUsersByDay(prevYearUsers, month, prevYear);

    const daysInMonth = new Date(curYear, month, 0).getDate();
    const xLabels = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    return (
        <LineChart
            width={500}
            height={300}
            series={[
                { data: prevYearData, label: `${prevYear} Daily Sales` },
                { data: curYearData, label: `${curYear} Daily Sales` },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
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
