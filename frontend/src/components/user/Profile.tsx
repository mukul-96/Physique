import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { useFetchUser } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface MyJwtPayload {
  id: string;
}


export default function Profile() {
  const [userId, setUserId] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [showLimit, setShowLimit] = useState<number>(3); 
  const navigate=useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("token") || localStorage.getItem("authorization");
    if (userToken) {
      setToken(userToken);
      try {
        const decoded = jwtDecode<MyJwtPayload>(userToken);
        setUserId(parseInt(decoded.id));
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const { user, loading, error } = useFetchUser(userId);
  console.log(user)

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  const loadMore = () => {
    setShowLimit(prevLimit => prevLimit + 3); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-28 rounded-lg">
        {user && (
          <> 
            <div className="flex items-center space-x-6 w-full">
              <img
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                alt="User Avatar"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-green-600 font-semibold">Balance: ₹{user.balance}</p>
              </div>
            </div>
            <div className='flex justify-end items-center '>
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

            <hr className="my-6" />

           

        
<section>
  <h3 className="text-xl font-semibold mb-4">Payment History</h3>
  {user.memberships && user.memberships.length > 0 ? (
    <div className="space-y-4">
      {user.memberships
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, showLimit)
        .map((history) => (
          <div key={history.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-600">
              <span className="font-semibold">Amount:</span> ₹{history.price}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span> {new Date(history.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Subscription:</span> {history.subscription}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Branch ID:</span> {history.branchId}
            </p>
          </div>
        ))}
      
      {showLimit < user.memberships.length && (
        <p
          onClick={loadMore}
          className="mt-4 text-blue-500 cursor-pointer hover:underline"
        >
          Load More
        </p>
      )}
    </div>
  ) : (
    <p className="text-gray-500">No payment history found.</p>
  )}
</section>

          </>
        )}
      </div>
    </div>
  );
}
