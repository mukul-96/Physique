import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import TotalCustomersCard from "./TotalCustomersCard";
import TotalSalesCard from "./TotalSalesCard";


interface ManagerPageGraphsProps {
  branchId: number|null;
}

export default function ManagerPageGraphs({ branchId }: ManagerPageGraphsProps) {
  const [dailyEntry, setDailyEntry] = useState(0);
  const [dailySales, setDailySales] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        if (!branchId) {
          console.error("Branch ID is missing.");
          setError("Branch ID is missing.");
          return;
        }

        const url = `${BACKEND_URL}manager/dailydata/${branchId}`;
        const token = localStorage.getItem("authorization");

        const res = await axios.get(url, {
          headers: {
            Authorization: token || "",
          },
        });

        if (res.data && typeof res.data.dailyEntry === "number" && typeof res.data.dailySales === "number") {
          setDailyEntry(res.data.dailyEntry);
          setDailySales(res.data.dailySales);
          setError(null); 
        } else {
          throw new Error("Unexpected API response structure.");
        }
      } catch (err) {
        console.error("Error fetching daily data:", err);
      }
    };

    fetchDailyData();
  }, [branchId]);

  return (
    <div className="h-full w-full grid grid-cols-[50%_50%] gap-1">
      {error ? (
        <div className="col-span-3 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <>
          <div className="h-full w-full ">
            <TotalCustomersCard count={dailyEntry}/>
          </div>
          <div className="h-full w-full">
          <TotalSalesCard count={dailySales}/>

          </div>
        </>
      )}
    </div>
  );
}
