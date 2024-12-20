import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import CurAndPrevYearSales from "./graphs/CurAndPrevYearSales";
import PieSubscriptionChart from "./graphs/PieSubscriptionChart";
import BarsDataset from "./graphs/BarsDataset";
import AnalyticsSkeleton from "../skeletons/AnalyticsSkeleton";

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
        return userDate.getFullYear() === year && userDate.getMonth() + 1 === month;
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
        if (branchId) fetchAnalyticsData();
    }, [branchId, month, year]);

    const fetchAnalyticsData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${BACKEND_URL}manager/sales/${branchId}`, {
                params: { month, year },
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
    const grossProfitCurrentYear = monthlyTurnoverCurrentYear - totalExpense;
    const curYearDataset = generateMonthlyDataset(curYearUsers, year);
    const prevYearDataset = generateMonthlyDataset(prevYearUsers, year - 1);
    console.log(monthlyTurnoverDifference)

    if (loading) return <AnalyticsSkeleton/>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Monthly Turnover</h3>
                        <p className="text-3xl font-bold mt-2">${monthlyTurnoverCurrentYear}</p>
                        <p className={`mt-1 font-bold text-xl ${grossProfitCurrentYear >= 0 ? "text-green-200" : "text-red-500"}`}>
                            ${grossProfitCurrentYear} 
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-400 to-orange-300 text-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Annual Turnover</h3>
                        <p className="text-3xl font-bold mt-2">${yearlyTurnoverCurrentYear}</p>
                        <p className={`mt-1 font-bold text-xl ${yearlyTurnoverDifference >= 0 ? "text-green-300" : "text-red-200"}`}>
                            ${yearlyTurnoverDifference} 
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sales Comparison</h2>
                    <CurAndPrevYearSales curYear={year} prevYear={year - 1} curYearUsers={curYearUsers} prevYearUsers={prevYearUsers} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{year} Subscription Distribution</h3>
                        <PieSubscriptionChart curUsers={curYearMonthUsers} />
                    </div>
                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{year - 1} Subscription Distribution</h3>
                        <PieSubscriptionChart curUsers={prevYearMonthUsers} />
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Subscription Trends</h2>
                    <BarsDataset dataset={curYearDataset} title={`Subscriptions - ${year}`} />
                    <BarsDataset dataset={prevYearDataset} title={`Subscriptions - ${year - 1}`} />
                </div>
            </div>
        </div>
    );
}
