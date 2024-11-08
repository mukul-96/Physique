import { FaDumbbell, FaChartLine, FaHome, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddBranchModal from './AddBranchModal'; 
import AddPlanModal from './AddPlanModal'; 

interface NavbarProps {
  branchId: string | null | undefined;
}

type NavButtonProps = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  dropdownOptions?: { label: string; onClick: () => void }[];
};

export default function Navbar({ branchId }: NavbarProps) {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'plan' | 'branch' | null>(null);

  const handleAddButtonClick = (type: 'plan' | 'branch') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex m-4 bg-black justify-center max-w-[500px] rounded-full">
      <NavButton
        icon={<FaHome />}
        label="Home"
        onClick={() => navigate(`/head/1/branches`)}
      />
      <div className='flex justify-center items-center'>
        <Switch branchId={branchId} />
      </div>
      <div>
        <NavButton
          icon={<FaPlus />}
          label="Add"
          onClick={() => setIsModalOpen(true)}
          dropdownOptions={[
            { label: 'Add New Plan', onClick: () => handleAddButtonClick('plan') },
            { label: 'Add New Branch', onClick: () => handleAddButtonClick('branch') },
          ]}
        />
      </div>

      {isModalOpen && modalType === 'branch' && <AddBranchModal isOpen={isModalOpen}  closeModal={() => setIsModalOpen(false)} />}
      {isModalOpen && modalType === 'plan' && <AddPlanModal isOpen={isModalOpen}  closeModal={() => setIsModalOpen(false)} />}

      <div className='flex justify-center items-center m-4'>
        <button className="Btn">
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("authorization");
            navigate('/');
          }} className="text">Logout</div>
        </button>
      </div>
    </div>
  );
}

const NavButton = ({ icon, label, onClick, dropdownOptions }: NavButtonProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    
  };

  return (
    <div className="relative flex flex-col items-center m-6 text-white">
      <button
        onClick={handleClick}
        className="flex flex-col items-center"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => {
          if (!dropdownOptions) setShowDropdown(false);
        }}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-xs">{label}</span>
      </button>

      {dropdownOptions && showDropdown && (
        <div
          className="absolute top-full mt-4 bg-slate-800 shadow-lg rounded-md text-white font-semibold flex justify-center "
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {dropdownOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full border-r-2  whitespace-nowrap  border-white px-4 py-2 hover:bg-slate-600 "
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const Switch = ({ branchId }: { branchId: string | null | undefined }) => {
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
