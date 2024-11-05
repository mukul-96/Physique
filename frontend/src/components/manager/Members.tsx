import { useEffect } from "react";
import { useFetchMembers } from "../../hooks";
import MemberCard from "./MemberCard";
import StaffListSkeleton from "../../skeletons/StaffListSkeleton";

interface Props {
  branchId: number | null;
}

interface UseFetchMembersDetails {
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
  id: number;
  email: string;
  name: string;
  password: string;
  balance: number;
  isActive: boolean;
}

export default function Members({ branchId }: Props) {
  const { members, loading, error } = useFetchMembers(branchId);

  useEffect(() => {
  }, [branchId]);

  

  if (error) {
    return <div>Error loading members: {error}</div>;
  }
  return (
    <div className="p-4">
       <div className="drop-shadow-md text-md h-14 w-full flex flex-row items-center justify-around font-semibold text-slate-500 bg-white">
        <div className="w-full border-r-4 border-slate-200 flex items-center h-full justify-center">Full Name</div>
        <div className="w-full border-r-4 border-slate-200 flex justify-center items-center h-full">ID</div>
        <div className="flex w-full justify-center border-r-4 border-slate-200 items-center h-full">Email Address</div>
        <div className="w-full border-r-3 gap-2 border-slate-200 flex justify-center items-center h-full">Membership</div>
      </div>
      {loading?<StaffListSkeleton/>:
      <div className=" gap-4">
        {members.map((member: UseFetchMembersDetails) =>
          member.enrolled.length > 0 && (
            member.enrolled.map((enrollment: EnrolledMember) => (
              <MemberCard
                key={enrollment.id}
                member={{
                  id: enrollment.user.id,
                  name: enrollment.user.name,
                  email: enrollment.user.email,
                  subscription: member.name,
                  active: enrollment.user.isActive,
                }}
              />
            ))
          ) 
        )}
      </div>}
    </div>
  );
}