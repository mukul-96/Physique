import { FaDumbbell, FaChartLine,FaHome, FaPlus, } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';

interface NavbarProps {
  branchId: string|null|undefined;
}

export default function Navbar({ branchId }: NavbarProps) {
  const navigate=useNavigate();
  return (
    <div className="flex m-4 bg-black  justify-center max-w-[500px] rounded-full">
        <NavButton icon={<FaHome />} label="Home" navigateTo={`/head`} />
        <div className='flex justify-center items-center'>
        <Switch branchId={branchId} />
      </div>
      <div>
      <NavButton icon={<FaPlus />} label="Add" navigateTo={`/add`} />

      </div>
      <div className='flex justify-center items-center m-4'>
        <button className="Btn ">
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div onClick={()=>{
              localStorage.removeItem("token");
              localStorage.removeItem("authorization");
              navigate('/');
          }} className="text">Logout</div>
        </button>
      </div>
    </div>
  );
}
const NavButton = ({ icon, label, navigateTo }: { icon: JSX.Element, label: string, navigateTo: string }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <button onClick={handleClick} className="flex flex-col items-center m-6 text-white">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </button>
  );
};

const Switch = ({ branchId }: { branchId: string | null|undefined }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (branchId && currentPath.includes(`/head/analytics/${branchId}`)) {
      setChecked(true); 
    }
  }, [branchId]);

  const handleToggle = () => {
      if (!branchId) { 
        navigate('/head'); 
      } else {
        if (checked) {
          navigate(`/head/branch/${branchId}`); 
        } else {
          navigate(`/head/analytics/${branchId}`); 
        }
        setChecked(!checked); 
      }
    };

  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={handleToggle} />
      <div className="slider">
        <span className='text-2xl'><FaChartLine /></span>
        <span className='text-2xl'><FaDumbbell /></span>
      </div>
    </label>
  );
};
