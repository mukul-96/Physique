import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import CurAndPrevYearSales from "./graphs/CurAndPrevYearSales";
import PieSubscriptionChart from "./graphs/PieSubscriptionChart";
import BarsDataset from "./graphs/BarsDataset"; 

interface User {
    id: number;
    userId: number;
    subscription: string;
    branchId: number;
    date: string; 
    price: number;
}

function filterUsersByMonth(users: User[], year: number, month: number): User[] {
    return users.filter((user) => {
        const userDate = new Date(user.date);
        return userDate.getFullYear() === year && (userDate.getMonth() + 1) === month;
    });
}

function calculateTurnover(users: User[]): number {
    return users.reduce((total, user) => total + user.price, 0);
}

function generateMonthlyDataset(users: User[], year: number): { month: number; [key: string]: number }[] {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const subscriptionTypes = Array.from(new Set(users.map(user => user.subscription)));

    return months.map((month) => {
        const monthlyData: { month: number; [key: string]: number } = { month };

        subscriptionTypes.forEach(type => {
            monthlyData[type] = filterUsersByMonth(users, year, month)
                .filter(user => user.subscription === type).length;
        });

        return monthlyData;
    });
}

interface AnalyticsProps {
    branchId: string | null;
    month: number;
    year: number;
    totalExpense: number;    
}



export default function Analytics({ branchId, month, year, totalExpense }: AnalyticsProps) {
    const [curYearUsers, setCurYearUsers] = useState<User[]>([]);
    const [prevYearUsers, setPrevYearUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (branchId) {
            fetchAnalyticsData();
        }
    }, [branchId, month, year]);

    const fetchAnalyticsData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BACKEND_URL}manager/sales/${branchId}`, {
                params: { month, year }
            });
            const data = response.data;
            setCurYearUsers(data.curYearUsers);
            setPrevYearUsers(data.prevYearUsers);
        } catch (error) {
            setError("Error fetching analytics data.");
            console.error("Error fetching analytics data:", error);
        } finally {
            setLoading(false);
        }
    };

    const curYearMonthUsers = filterUsersByMonth(curYearUsers, year, month);
    const prevYearMonthUsers = filterUsersByMonth(prevYearUsers, year - 1, month);
    const monthlyTurnoverCurrentYear = calculateTurnover(curYearMonthUsers);
    const monthlyTurnoverPrevYear = calculateTurnover(prevYearMonthUsers);
    const yearlyTurnoverCurrentYear = calculateTurnover(curYearUsers);
    const yearlyTurnoverPrevYear = calculateTurnover(prevYearUsers);
    const monthlyTurnoverDifference = monthlyTurnoverCurrentYear - monthlyTurnoverPrevYear;
    const yearlyTurnoverDifference = yearlyTurnoverCurrentYear - yearlyTurnoverPrevYear;
    const monthlyStatus = monthlyTurnoverDifference >= 0 ? "Profit" : "Loss";
    const yearlyStatus = yearlyTurnoverDifference >= 0 ? "Profit" : "Loss";
    const grossProfitCurrentYear = monthlyTurnoverCurrentYear - totalExpense;
    const curYearDataset = generateMonthlyDataset(curYearUsers, year);
    const prevYearDataset = generateMonthlyDataset(prevYearUsers, year - 1);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row justify-center items-center mb-6 bg-purple-100">
                <div className="flex flex-col items-center mx-10">
                    <h3 className="text-xl font-semibold">Monthly Turnover</h3>
                    <p className="text-2xl font-bold text-black">${monthlyTurnoverCurrentYear}</p>
                    <p className={`text-lg font-bold ${grossProfitCurrentYear >= 0 ? "text-green-500" : "text-red-500"}`}>
                        ${grossProfitCurrentYear} ({monthlyStatus})
                    </p>
                </div>
                <div className="flex flex-col items-center mx-10">
                    <h3 className="text-xl font-semibold">Annual Turnover</h3>
                    <p className="text-2xl font-bold text-black">${yearlyTurnoverCurrentYear}</p>
                    <p>Previous Year: ${yearlyTurnoverPrevYear}</p>
                    <p className={`text-lg font-bold ${yearlyTurnoverDifference >= 0 ? "text-green-500" : "text-red-500"}`}>
                        ${yearlyTurnoverDifference} ({yearlyStatus})
                    </p>
                </div>
            </div>

            <div className="mb-6 flex flex-col items-center">
                <CurAndPrevYearSales curYear={year} prevYear={year - 1} curYearUsers={curYearUsers} prevYearUsers={prevYearUsers} />
                <h1 className="font-semibold text-base">Subscription Sales Comparison</h1>
            </div>

            <div className="mb-6 flex flex-col items-center md:flex-row">
                <h3 className="text-lg font-semibold">Subscription Distribution</h3>
                <div className="flex flex-col items-center mx-4">
                    <PieSubscriptionChart curUsers={curYearMonthUsers} />
                    <h1 className="font-semibold text-base">{year}</h1>
                </div>
                <div className="flex flex-col items-center mx-4">
                    <PieSubscriptionChart curUsers={prevYearMonthUsers} />
                    <h1 className="font-semibold text-base">{year - 1}</h1>
                </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row justify-center gap-6">
                <h3 className="text-lg font-semibold">Subscription Distribution - Bar Graph</h3>
                <BarsDataset dataset={curYearDataset} title={`Subscription Distribution - ${year}`} />
                <BarsDataset dataset={prevYearDataset} title={`Subscription Distribution - ${year - 1}`} />
            </div>
        </div>
    );
}

