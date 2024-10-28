import Navbar from "../components/user/Navbar";
import QrButton from "../components/user/QrButton";
import { useFetchUser } from "../hooks";
import { useParams } from "react-router-dom";

export default function Landing() {
  const { id } = useParams();
  const safeId = parseInt(id || '');
  const { user, loading, error } = useFetchUser(safeId);

  const getStatus = () => {
    if (!user) return 'Loading...';

    if (user.balance <= 0) return 'Inactive';
    if (user.balance < 100) return 'About to Expire';
    return 'Active';
  };

  return (
    <div className="h-screen w-full flex flex-col items-center bg-gray-100">
      <Navbar />
      <div className="flex flex-1 justify-center items-center ">
        <div className={`flex  p-4 rounded-full ${getStatus() === 'Active' ? 'border-green-500 border-4' : getStatus() === 'About to Expire' ? 'border-yellow-500 border-4' : 'border-red-500 border-4'}`}>
          <div className="flex items-center  justify-center w-64">
            <div className="text-center ">
              <h2 className="text-xl font-semibold">User Status</h2>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <p className={`text-lg font-bold ${getStatus() === 'Active' ? 'text-green-500' : getStatus() === 'About to Expire' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {getStatus()}
                </p>
              )}
            </div>
          </div>

          <div className="w-52 h-52 flex justify-center items-center bg-gray-300 rounded-full shadow-lg relative">
            <div className="absolute inset-0 flex justify-center items-center">
              <QrButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
