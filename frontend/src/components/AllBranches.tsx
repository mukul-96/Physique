import Navbar from "./user/Navbar";
import Navbar1 from "./head/Navbar";
import { useEffect,useState } from "react";
import { useFetchBranches } from "../hooks";
import { useParams } from "react-router-dom";
import BranchCard from "./head/BranchCard";

export default function AllBranches() {
    const [hasFetched,setHasFetched]=useState<boolean>(false);

    const { branches=[], loading, error } = useFetchBranches();
    const {role}=useParams();
    useEffect(() => {
        if (!loading && !hasFetched && branches.length > 0) {
          setHasFetched(true); 
        }
      }, [loading, branches, hasFetched]);
      const branchId=null

  return (
    <div className="">
      <div className="flex justify-center">{( role==="user"||role==undefined)?<div className="mb-20"><Navbar/></div>:<Navbar1 branchId={branchId} />
     }</div>
       
        <div className="mt-20">
        {error?<div>error</div>:""}
            <div className='flex flex-wrap gap-5 mt-10 p-10'>
            {loading ? "loading..." : (
                branches.map((branch, index) => (
                    <BranchCard branch={branch} key={index} />
                ))
            )}
            </div>
        </div>
    </div>
  )
}
