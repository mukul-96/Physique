import { useNavigate } from "react-router-dom";
import branchHomee from "../../images/home-branch/branchHome.jpg"
interface BranchDetails {
  id: number;
  name: string;
  address: string;
  managerId: number;
  imageUrl: string; 
}

export default function BranchCard({ branch }: { branch: BranchDetails }) {
  const navigate = useNavigate();

  return (
    <button
      className="flex flex-col border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 m-2 overflow-hidden"
      onClick={() => {
        navigate(`/head/branch/${branch.id}`);
      }}
    >
      <div className="h-48 w-96 bg-gray-300 relative">
        <img
          src={branchHomee} 
          alt={branch.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-between  h-full w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold text-lg text-gray-800">{branch.name}</div>
          <div className="text-gray-600">{branch.address}</div>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          <span className="bg-green-200 text-green-800 rounded-full px-2 py-1">Open</span>
        </div>
      </div>
    </button>
  );
}
