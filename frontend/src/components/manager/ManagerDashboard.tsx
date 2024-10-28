import  { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import AddEmployeeCard from "./AddEmployeeCard";
import StaffList from "../../skeletons/StaffListSkeleton";
import { useFetchStaff } from "../../hooks";

interface EmployeeDetails {
  id: number;
  branchId: number;
  name: string;
  designation: string;
  salary: number;
  email: string;
  description?: string;
}

interface ManagerDashboardProps {
  branchId: number | null;
  setSalary:(salary:number)=>void;
}

export default function ManagerDashboard({ branchId,setSalary }: ManagerDashboardProps) {
  const [showAddEmployeeCard, setShowAddEmployeeCard] = useState(false);
  const { employees, loading: staffLoading, error: staffError, fetchStaff } = useFetchStaff(branchId);
  const [employeeAdded, setEmployeeAdded] = useState(false);
  const [employeeRemoved, setEmployeeRemoved] = useState(false);
  const [filter, setFilter] = useState<'all' | 'trainers'>('all');
  const [filteredStaff, setFilteredStaff] = useState<EmployeeDetails[] | null>(null);

  useEffect(() => {
    const performFetch = async () => {
      await fetchStaff();
      setEmployeeAdded(false);
      setShowAddEmployeeCard(false);
      if (employeeRemoved) {
        setEmployeeRemoved(false);
      }
    };

    if (employeeAdded || employeeRemoved) {
      performFetch();
    }
  }, [fetchStaff, employeeAdded, employeeRemoved]);

  useEffect(() => {
    if (employees) {
      if (filter === 'trainers') {
        const filterRes = employees.filter(employee => employee.designation === 'Trainer');
        setFilteredStaff(filterRes.length > 0 ? filterRes : null);
      } else {
        setFilteredStaff(employees);
      }
      let salary = 0;
      for (let i = 0; i < employees.length; i++) {
        salary += employees[i].salary;
      }
      setSalary(salary);
    }
  }, [employees, filter,setSalary]);

  const addNewEmployeeHandler = () => {
    setShowAddEmployeeCard(true);
  };

  const allFilterHandler = () => {
    setFilter('all');
  };

  const trainerFilterHandler = () => {
    setFilter('trainers');
  };

  const closeAddEmployeeCardHandler = () => {
    setShowAddEmployeeCard(false);
  };

  const handleEmployeeAdded = () => {
    setEmployeeAdded(true);
    closeAddEmployeeCardHandler();
  };

  const employeeRemoveHandler = () => {
    setEmployeeRemoved(true);
  };

  if (staffError) {
    return <div>Error: {staffError}</div>;
  }

  return (
    <div className="p-4">
      {showAddEmployeeCard && (
        <div
          className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeAddEmployeeCardHandler}
        >
          <div className="relative p-4 rounded w-[80%] max-w-3xl h-[100%] max-h-screen">
            <button
              className="absolute top-14 right-16 text-white bg-red-500 hover:bg-red-700 rounded-md p-2"
              onClick={closeAddEmployeeCardHandler}
            >
              &times;
            </button>
            <div onClick={(e) => e.stopPropagation()}>
              <AddEmployeeCard onEmployeeAdded={handleEmployeeAdded} />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between items-center p-2 mt-3">
        <div className="flex flex-row space-x-4 items-center">
          <h1 className="text-xl font-bold">Employees</h1>
          <button className="gradient-button" onClick={addNewEmployeeHandler}>
            Add New Employee
          </button>
        </div>
        <div>
          <button
            onClick={allFilterHandler}
            className={`${filter === 'all' ? 'gradient-button' : 'gradient-button-filter'} m-1`}
          >
            ALL
          </button>
          <button
            onClick={trainerFilterHandler}
            className={`${filter === 'trainers' ? 'gradient-button' : 'gradient-button-filter'} m-1`}
          >
            TRAINERS
          </button>
        </div>
      </div>
      <div className="drop-shadow-md text-md h-14 w-full flex flex-row items-center justify-around font-semibold text-slate-500 bg-white">
        <div className="w-full border-r-4 border-slate-200 flex items-center h-full justify-center">Full Name</div>
        <div className="w-full border-r-4 border-slate-200 flex justify-center items-center h-full">Position</div>
        <div className="flex w-full justify-center border-r-4 border-slate-200 items-center h-full">Email Address</div>
        <div className="w-full border-r-3 gap-2 border-slate-200 flex justify-center items-center h-full">Dismiss</div>
      </div>
      <div>
        {staffLoading ? (
          <StaffList />
        ) : (
          filteredStaff?.map((employee) => (
            <EmployeeCard employee={employee} onEmployeeRemoved={employeeRemoveHandler} key={employee.id} />
          ))
        )}
      </div>
    </div>
  );
}
