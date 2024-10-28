import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faCalendarCheck, faMoneyBillWave, faChartLine, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '../Avatar';

type ManagerNavbarProps = {
  managerName: string;
  setButton: (section: 'Dashboard' | 'Members' | 'Plans' | 'Expense' | 'Analytics' | 'Logout') => void;
};

export default function ManagerNavbar({ managerName, setButton }: ManagerNavbarProps) {
  const [activeButton, setActiveButton] = useState<'Dashboard' | 'Members' | 'Plans' | 'Expense' | 'Analytics' | 'Logout'>('Dashboard');

  const handleButtonClick = (section: 'Dashboard' | 'Members' | 'Plans' | 'Expense' | 'Analytics' | 'Logout') => {
    setActiveButton(section);
    setButton(section);
  };

  return (
    <div className="flex flex-col h-screen items-center p-4 bg-white w-64">
      {/* Logo */}
      <div className="text-2xl font-bold mb-4 text-black">
        <span>Logo</span>
      </div>
      <div className="flex-grow"></div>

      <div className="flex flex-col space-y-4 w-full m-auto">
        <button
          onClick={() => handleButtonClick('Dashboard')}
          className={`flex items-center py-3 px-4 rounded w-full justify-start text-lg font-semibold ${activeButton === 'Dashboard' ? 'text-green-500 border-l-4 border-green-500' : 'text-gray-400'} hover:bg-slate-100`}
        >
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-2 text-gray-700" />
          Dashboard
        </button>
        <button
          onClick={() => handleButtonClick('Members')}
          className={`flex items-center py-3 px-4 rounded w-full justify-start text-lg font-semibold ${activeButton === 'Members' ? 'text-green-400 border-l-4 border-green-500' : 'text-gray-400'} hover:bg-slate-100`}
        >
          <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-700" />
          Members
        </button>
        <button
          onClick={() => handleButtonClick('Plans')}
          className={`flex items-center py-3 px-4 rounded w-full justify-start text-lg font-semibold ${activeButton === 'Plans' ? 'text-green-500 border-l-4 border-green-500' : 'text-gray-400'} hover:bg-slate-100`}
        >
          <FontAwesomeIcon icon={faCalendarCheck} className="mr-2 text-gray-700" />
          Plans
        </button>
        <button
          onClick={() => handleButtonClick('Expense')}
          className={`flex items-center py-3 px-4 rounded w-full justify-start text-lg font-semibold ${activeButton === 'Expense' ? 'text-green-500 border-l-4 border-green-500' : 'text-gray-400'} hover:bg-slate-100`}
        >
          <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-gray-700" />
          Expense
        </button>
        <button
          onClick={() => handleButtonClick('Analytics')}
          className={`flex items-center py-3 px-4 rounded w-full justify-start text-lg font-semibold ${activeButton === 'Analytics' ? 'text-green-500 border-l-4 border-green-500' : 'text-gray-400'} hover:bg-slate-100`}
        >
          <FontAwesomeIcon icon={faChartLine} className="mr-2 text-gray-700" />
          Analytics
        </button>
      </div>
      <div className="flex-grow"></div>

      <div className="mt-auto flex flex-col items-center w-full">
        <Avatar name={managerName || ""} />
        <button
          onClick={() => handleButtonClick('Logout')}
          className="gradient-button"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-white" />
          Logout
        </button>
      </div>
    </div>
  );
}