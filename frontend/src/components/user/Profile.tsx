import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { useFetchUser } from "../../hooks";

interface MyJwtPayload {
    id: string;
  }
  
export default function Profile() {
    const [userId, setUserId] = useState<number>(0);
    const [token,setToken] = useState<string | null>(null);
    
    useEffect(() => {
        const userToken = localStorage.getItem("token") || localStorage.getItem("authorization");
        if (userToken) {
            setToken(userToken)
            console.log(token)
          try {
            const decoded = jwtDecode<MyJwtPayload>(userToken)        
            setUserId(parseInt(decoded.id));
          } catch (error) {
            console.error("Invalid token", error);
          }
        }
      }, [token]);

      const { user, loading, error } = useFetchUser(userId);
      console.log(user)
      if (loading) return <div className="text-center mt-10">Loading...</div>;
      if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
    

      return (
        <div className="min-h-screen bg-gray-100 ">
          <Navbar />
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-28 rounded-lg">
            {/* Personal Information */}
            {user && (
              <>
                <div className="flex items-center space-x-6">
                  {/* Avatar */}
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
    
                {/* Divider */}
                <hr className="my-6" />
    
                {/* Enrollments */}
                <section className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Enrollments</h3>
                  {user.enrolledIn && user.enrolledIn.length > 0 ? (
                    <div className="space-y-4">
                      {user.enrolledIn.map((enrollment: any) => (
                        <div key={enrollment.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                          <h4 className="font-semibold">{enrollment.planName}</h4>
                          <p className="text-gray-600">Start Date: {new Date(enrollment.startDate).toLocaleDateString()}</p>
                          <p className="text-gray-600">End Date: {new Date(enrollment.endDate).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No enrollments found.</p>
                  )}
                </section>
    
                {/* Payment History */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Payment History</h3>
                  {user.memberships && user.memberships.length > 0 ? (
                    <div className="space-y-4">
                      {user.memberships.map((history: any) => (
                        <div key={history.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                          <p className="text-gray-600">
                            <span className="font-semibold">Amount:</span> ₹{history.amount}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">Date:</span> {new Date(history.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-600">{history.description}</p>
                        </div>
                      ))}
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
