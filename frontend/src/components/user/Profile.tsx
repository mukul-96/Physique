import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { useFetchUser } from "../../hooks";
// import axios from "axios";

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
      }, []);

      const { user, loading, error } = useFetchUser(userId);
      console.log(user)


  return (
    <div>
        <Navbar/>
        {loading && <div>
            loading</div>}
            {error && <div>{error}</div>}
    </div>
  )
}
