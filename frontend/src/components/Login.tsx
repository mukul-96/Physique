import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from '../config';
import Spinner from './Spinner';

interface TokenAndIdResponse {
  token: string;
  id: number;
}

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const url = `${BACKEND_URL}${role}/signin`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.post<TokenAndIdResponse>(url, { email, password });
      if (res.data.token) {
        localStorage.setItem("authorization", "Bearer " + res.data.token);
        if (role === "manager") navigate(`/manager/${res.data.id}`);
        else if (role === "Head") navigate(`/head/1/branches`);
        else navigate(`/user/${res.data.id}`);
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white rounded-r-2xl flex items-center justify-center">
      <div className="w-full max-w-md p-6 z-50">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>
        <div className="mt-4">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
            Select Your Role:
          </label>
          <select

            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          >
            <option value="user">Member</option>
            <option value="manager">Manager</option>
            <option value="Head">Head</option>
          </select>
        </div>

        <form className="space-y-4 mt-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Your email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500">
                  Remember me
                </label>
              </div>
            </div>
            <Link to="" className="text-sm font-medium text-primary-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Sign in'}
          </button>
          <p className="text-sm font-light text-purple-800 flex justify-center">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="font-medium text-primary-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
