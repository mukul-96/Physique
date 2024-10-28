import Navbar from '../components/head/Navbar';
import { useFetchBranches } from '../hooks';
import BranchCard from '../components/head/BranchCard';
import { useState,useEffect } from 'react';

export default function HeadPage() {
    const [hasFetched,setHasFetched]=useState<boolean>(false);
    const { branches=[], loading, error } = useFetchBranches();
    const branchId=undefined;
    useEffect(() => {
        if (!loading && !hasFetched && branches.length > 0) {
          setHasFetched(true); 
        }
      }, [loading, branches, hasFetched]);
    return (
        <div className='head-page min-h-[100vh] w-full'>
            <div className='flex justify-center'>
                
                 <Navbar branchId={branchId} />
            </div>
            {error?<div>error</div>:""}
            <div className='flex flex-wrap gap-5 mt-10 p-10'>
            {loading ? "loading..." : (
                branches.map((branch, index) => (
                    <BranchCard branch={branch} key={index} />
                ))
            )}
            </div>
        </div>
    );
}
