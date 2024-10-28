import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "./Spinner";
import { BACKEND_URL } from "../config";

export const SignupDetails = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const url = `${BACKEND_URL}user/signup`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post<{ token: string }>(url, { email, password, name });
      const token = res.data.token;
      localStorage.setItem("authorization", "Bearer "+token);

      navigate(`/user`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError('An error occurred. Please try again.');
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        setError('An unexpected error occurred.');
        console.error('Unknown error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-r-2xl flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create Sign in Credentials
        </h1>

        <form className="space-y-4 mt-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Your name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Arnold"
              value={name}
              required
            />
          </div>
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
              value={email}
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
              value={password}
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
            <a href="#" className="text-sm font-medium text-primary-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? <Spinner></Spinner> : 'Sign up'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-sm font-light text-purple-800">
            Already a member of Fitmusk{" "}
            <Link to="/signin" className="font-medium text-primary-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
