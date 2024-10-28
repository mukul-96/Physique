import { Avatar } from "../Avatar";
import Accordion from "./Accordion";
interface MemberDetails {
  id: number;
  name: string;
  subscription: string;
  active: boolean;
  email: string;
}

interface MemberCardProps {
  member: MemberDetails; 
}

const MemberCard = ({ member }: MemberCardProps) => {


  return (
    <div className="rounded w-full ">
      <Accordion
        header={
          <div className="flex flex-row w-full items-center justify-between ">
<div className="flex items-center gap-4 ">
          <div className="mt-3">    <Avatar name={member.name} />
          </div>
  <h3 className="text-md font-bold text-gray-500 ">{member.name}</h3>
</div>
<p className="text-md font-bold text-gray-500">{member.id}</p>
<p className="text-md font-bold text-gray-500"> {member.email}</p> 
  <button  className="gradient-button" >
    {member.subscription}
            </button>
      </div>

        
      }
      body={
        <> 
        <div className="flex flex-col gap-4">
        <p className="text-md font-bold text-gray-500 ">Description: {member.name || "No description provided."}</p>
          <p className=" text-gray-500 text-md font-bold">Salary: ${member.active}</p>
        
        </div>
          </>
      }
      />
    </div>
  );
};

export default MemberCard;
