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
    const monthlyTurnoverDifference = (monthlyTurnoverPrevYear > 0) 
    ? parseFloat(((monthlyTurnoverCurrentYear - monthlyTurnoverPrevYear) / monthlyTurnoverPrevYear * 100).toFixed(2)) 
    : 100;
  
  const yearlyTurnoverDifference = (yearlyTurnoverPrevYear > 0) 
    ? parseFloat(((yearlyTurnoverCurrentYear - yearlyTurnoverPrevYear) / yearlyTurnoverPrevYear * 100).toFixed(2)) 
    : 100;
    const curYearDataset = generateMonthlyDataset(curYearUsers, year);
    const prevYearDataset = generateMonthlyDataset(prevYearUsers, year - 1);
     

    if (loading) return <AnalyticsSkeleton/>;
    if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
               

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 bg-slate-50 " id="el-w6r1yq90">
     <div className="bg-white p-6 rounded-lg border border-neutral-200/20" id="el-zb035468">
        <div className="flex justify-between items-start" id="el-sm6nm72y">
            <div id="el-nojn3x6w">
                <p className="text-sm text-neutral-500" id="el-j5u0bzuk">Total Yearly Revenue</p>
                <h3 className="text-2xl font-bold text-neutral-800 mt-1" id="el-73a35xd0">$ {yearlyTurnoverCurrentYear}</h3>
                {yearlyTurnoverDifference>0?<p className="text-sm text-emerald-500 mt-1" id="el-cszxvitq">+{yearlyTurnoverDifference}% vs last year</p>
:<p className="text-sm text-red-500 mt-1" id="el-cszxvitq">{yearlyTurnoverDifference}% vs last year</p>
}
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg" id="el-gin8p1rm">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-wrlvlwee">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" id="el-bvvq7bg9"></path>
                </svg>
            </div>
        </div>
    </div>

    <div className="bg-white p-6 rounded-lg border border-neutral-200/20" id="el-oitd1vo0">
        <div className="flex justify-between items-start" id="el-h2w0axkn">
            <div id="el-nklzxdb3">
                <p className="text-sm text-neutral-500" id="el-bqvjn2aa">Sales</p>
                <h3 className="text-2xl font-bold text-neutral-800 mt-1" id="el-2u42u4on">1,243</h3>
                <p className="text-sm text-emerald-500 mt-1" id="el-b44k2zsu">+8.2% vs last month</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg" id="el-klk3wx8b">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-0lz7hu71">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" id="el-dfjjrkx8"></path>
                </svg>
            </div>
        </div>
    </div>

    <div className="bg-white p-6 rounded-lg border border-neutral-200/20" id="el-8syw02hg">
        <div className="flex justify-between items-start" id="el-1w931u7i">
            <div id="el-kwlc0lml">
                <p className="text-sm text-neutral-500" id="el-uxl37mc2">Total Monthly Revenue</p>
                <h3 className="text-2xl font-bold text-neutral-800 mt-1" id="el-lwnxs2xs">$ {monthlyTurnoverCurrentYear}</h3>
                {monthlyTurnoverDifference>0?<p className="text-sm text-emerald-500 mt-1" id="el-cszxvitq">+{monthlyTurnoverDifference}% vs last year</p>
:<p className="text-sm text-red-500 mt-1" id="el-cszxvitq">{monthlyTurnoverDifference}% vs last year</p>
}
            </div>
            <div className="p-2 bg-purple-100 rounded-lg" id="el-iorcn89s">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-v00ib8t9">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" id="el-oik08zgc"></path>
                </svg>
            </div>
        </div>
    </div>

    <div className="bg-white p-6 rounded-lg border border-neutral-200/20" id="el-p8xeygw2">
        <div className="flex justify-between items-start" id="el-ph0r617q">
            <div id="el-ungucetj">
                <p className="text-sm text-neutral-500" id="el-iief30fe">Profit This Month</p>
                <h3 className="text-2xl font-bold text-neutral-800 mt-1" id="el-hgkffapz">$ {monthlyTurnoverCurrentYear-totalExpense}</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg" id="el-g26fubkv">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-x3kbrdib">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" id="el-3indfdku"></path>
                </svg>
            </div>
        </div>
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
                    </div>                    <div className="p-4 bg-white shadow-md rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{year - 1} Subscription Distribution</h3>
                        <PieSubscriptionChart curUsers={prevYearMonthUsers} />
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Subscription Trends</h2>
                    <BarsDataset  dataset={curYearDataset} title={`Subscriptions - ${year}`} />
                    <BarsDataset dataset={prevYearDataset} title={`Subscriptions - ${year - 1}`} />
                </div>
            </div>
        </div>
    );
}
