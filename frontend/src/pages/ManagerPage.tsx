import ManagerNavbar from "../components/manager/ManagerNavbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ManagerNavbarSkeleton from "../skeletons/ManagerNavbarSkeleton";
import ManagerPageGraphs from "../components/manager/ManagerPageGraphs";
import { useFetchManager } from "../hooks";
import ManagerDashboard from "../components/manager/ManagerDashboard"; 
import Plans from "../components/manager/Plans";
import Members from "../components/manager/Members";
import Expense from "../components/manager/Expense";
import BranchAnalytics from "./BranchAnalytics";

export default function ManagerPage() {
  const { id } = useParams();
  const { manager, loading: managerLoading, error: managerError } = useFetchManager(id || "");
  const [branchId, setBranchId] = useState<number | null>(null);
  const [activeButton, setActiveButton] = useState<"Dashboard" | "Members" | "Plans" | "Expense" | "Analytics" | "Logout">("Dashboard");
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    if (manager?.branchId) {
      setBranchId(manager.branchId);
    }
  }, [manager?.branchId]);

  if (managerError) {
    return <div>Error: {managerError}</div>;
  }

  const renderActiveComponent = () => {
    switch (activeButton) {
      case 'Dashboard':
        return <ManagerDashboard branchId={branchId} setSalary={setSalary}/>; 
      case 'Members':
        return <div><Members branchId={branchId} /></div>;  
      case 'Plans':
        return <div className="h-full w-full "><Plans branchId={branchId}/></div>;
      case 'Analytics':        
        return <div className="h-full w-full overflow-x-hidden"><BranchAnalytics/></div>;
        case 'Expense':
          return <div><Expense branchId={branchId} salary={salary} ></Expense></div>
        default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 w-full">
      <div className="fixed h-full w-1/6 bg-white ">
        {managerLoading ? <ManagerNavbarSkeleton  /> : manager && <ManagerNavbar managerName={manager.name} setButton={setActiveButton} />}
      </div>
      <div className="ml-[20%] w-4/6 h-screen overflow-y-auto grid grid-rows-[30%_70%]">
      <div className="h-full w-full p-3 ">
      
        <ManagerPageGraphs branchId={branchId}></ManagerPageGraphs>
      </div>
    <div className="h-full w-full">        {renderActiveComponent()} 
    </div>
      </div>
      <div className="w-1/6 "></div>
    </div>
  );
}
