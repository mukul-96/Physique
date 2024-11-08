import axios from "axios";
import { useCallback } from "react";
import {  useEffect, useState } from "react";
import { BACKEND_URL } from "../config";



interface PlanDetails {
  name: string;
  description: string;
  price: number;
  active: boolean;
  days: number;
  planId: number;
}

interface UseFetchPlanReturn {
  plans: PlanDetails[] | null;
  loading: boolean;
  error: string | null;
}

interface ManagerDetails {
  id: number;
  branchId: number;
  email: string;
  name: string;
  password: string;
}

interface UseFetchManagerReturn {
  manager: ManagerDetails | null;
  loading: boolean;
  error: string | null;
}
interface UseFetchMembersDetails{
  id: number;
  name: string;
  description: string;
  price: number;
  days: number;
  active: boolean;
  enrolled: EnrolledMember[];
}
interface EnrolledMember {
  id: number;
  user: User;
}


interface User {
  id :number;
  email:string;
  name :string
  password :string;
  balance  : number;
  isActive : boolean;
}
interface UseFetchMembersDetailsReturns{
  members:UseFetchMembersDetails[];
 loading: boolean;
  error: string | null;

}
interface EmployeeDetails{
  id: number;
  branchId: number;
  name: string;
  designation: string;
  salary: number;
  email:string;
  description?: string;
}
interface UseFetchStaffReturn {
  employees: EmployeeDetails[] | null;
  loading: boolean;
  error: string | null;
  fetchStaff:() => Promise<void>
}
interface BranchDetails
{
  id:number;
  name:string;
  address:string;
  managerId:number;
}
interface Branch
{
  id:number;
  name:string;
  address:string;
  staff :EmployeeDetails[];
  reviews :feedback[];
  plans:PlanDetails[];
  expenditure:utilities[];
  manager:manager | null;
}
interface manager{
  managerName:string;
  managerEmail:string;
}
interface utilities{
  id :number;
  title  :string;
  cost :number;  
  year  : number;
  month  :number;
}
interface feedback{
  rating:number;
  content:string;
}

interface GymUser {
  id: number;
  email: string;
  name: string;
  balance: number;
  isActive: boolean;
  memberships: History[];
  enrolledIn: Enrollment[];
}

interface History {
  id: number;
  userId: number;
  subscription: string;
  branchId: number;
  date: Date;
  user: GymUser;
}

interface Enrollment {
  id: number;
  userId: number;
  planId: number;
  startDate: Date;
  endDate: Date;
  user: GymUser;
}

interface UseFetchUserResponse {
  user: GymUser | null;
  loading: boolean;
  error: string | null;
}

export const useFetchUser = (userId: number): UseFetchUserResponse => {
  const [user, setUser] = useState<GymUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const url = `${BACKEND_URL}user/${userId}`;
        const token = localStorage.getItem("authorization");
        const response = await axios.get<GymUser>(url, {
          headers: {
            Authorization: token ? token : ""
          }
        });
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch staff details: " + err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
};


export const useFetchStaff =(branchId:number|null):UseFetchStaffReturn=>{
  const [employees,setEmployees]=useState<EmployeeDetails[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchStaff = useCallback(async () => {
    const url = `${BACKEND_URL}manager/stafflist/${branchId}`;
    try {
      const token = localStorage.getItem("authorization");
      setLoading(true);
      setError(null);
  
      if (branchId !== null) {
        const res = await axios.get<EmployeeDetails[]>(url, {
          headers: {
            Authorization: token ? token : ""
          }
        });
        setEmployees(res.data);
      }
    } catch (err) {
      setError("Failed to fetch staff details: " + err);
    } finally {
      setLoading(false);
    }
  }, [branchId]);
  
  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);
  return { employees, loading, error,fetchStaff };

}


export const useFetchPlans = (branchId: number | null): UseFetchPlanReturn => {
  const [plans, setPlans] = useState<PlanDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authorization");
  const url = `${BACKEND_URL}manager/branchplan/${branchId}`;

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get<PlanDetails[]>(url, {
        headers: {
          Authorization: token ?token : ""
        }
      });
      console.log(res.data)

      setPlans(res.data);
    } catch (err) {
      setError("Failed to fetch plan details"+err);

    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => {
    if (branchId !== null) {
      fetchDetails();
    }
  }, [branchId, fetchDetails]);

  return { plans, loading, error };
};

export const useFetchMembers=(branchId:number |null ):UseFetchMembersDetailsReturns=>{
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<UseFetchMembersDetails[]>([]);;
  useEffect(() => {
    const fetchMemberDetails = async () => {
      const url = `${BACKEND_URL}manager/memberslist/${branchId}`;
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authorization");
        const res = await axios.get<UseFetchMembersDetails[]>(url, {
          headers: {
            Authorization: token ?token: "",
          },
        });

        setMembers(res.data);
      } catch (error) {
        setError("Failed to fetch members details"+error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberDetails();
  }, [branchId]);

  return { members, loading, error };
}

export const useFetchManager = (id: string): UseFetchManagerReturn => {
  const [manager, setManager] = useState<ManagerDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManagerDetails = async () => {
      const url = `${BACKEND_URL}manager/getdetails/${id}`;
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authorization");
        const res = await axios.get<ManagerDetails>(url, {
          headers: {
            Authorization: token ?token: "",
          },
        });

        setManager(res.data);
      } catch (error) {
        setError("Failed to fetch manager details"+error);
      } finally {
        setLoading(false);
      }
    };
    fetchManagerDetails();
  }, [id]);

  return { manager, loading, error };
};

export const useFetchBranches=()=>{

  const [branches, setBranches] = useState<BranchDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranchDetails = async () => {
      const url = `${BACKEND_URL}head/branches`;
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authorization");
        const res = await axios.get<BranchDetails[]>(url, {
          headers: {
            Authorization: token ?token: "",
          },
        });

        setBranches(res.data);
      } catch (error) {
        setError("Failed to fetch manager details"+error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranchDetails();
  }, []);

  return { branches, loading, error };
}
export const useFetchBranchDetails = (id:string|null) => {
  const [branchDetails, setBranchDetails] = useState<Branch>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranchDetails = async () => {
      const url = `${BACKEND_URL}head/branch/${id}`; 
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authorization");
        const res = await axios.get<Branch>(url, {
          headers: {
            Authorization: token ? token : "",
          },
        });
        setBranchDetails(res.data);
      } catch (error) {
        setError("Failed to fetch branch details: " + error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBranchDetails();
    }
  }, [id]);

  return { branchDetails, loading, error };
};




