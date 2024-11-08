import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { FaTimes } from 'react-icons/fa';
import Spinner from '../Spinner';

interface AddBranchModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

type BranchFormData = {
  branchName: string;
  branchAddress: string;
  managerEmail?: string;
  managerPassword?: string;
  managerName?: string;
};

const AddBranchModal: React.FC<AddBranchModalProps> = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState<BranchFormData>({
    branchName: '',
    branchAddress: '',
    managerEmail: '',
    managerPassword: '',
    managerName: '',
  });

  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authorization') || localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert('No authorization token found.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}head/addbranch`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message);
        closeModal();
      } else {
        setError(response.data.message || 'Failed to add branch.');
      }
    } catch (error) {
      console.error('Error adding branch:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-600" onClick={closeModal}>
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center">Add New Branch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-orange-700 font-bold mb-2">Branch Name:</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Branch Name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-orange-700 font-bold mb-2">Branch Address:</label>
            <input
              type="text"
              name="branchAddress"
              value={formData.branchAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Branch Address"
            />
          </div>

          <div className="mb-4">
            <label className="block text-orange-700 font-bold mb-2">Manager Email:</label>
            <input
              type="email"
              name="managerEmail"
              value={formData.managerEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Manager Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-orange-700 font-bold mb-2">Manager Password:</label>
            <input
              type="password"
              name="managerPassword"
              value={formData.managerPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Manager Password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-orange-700 font-bold mb-2">Manager Name:</label>
            <input
              type="text"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Manager Name"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {loading ? <Spinner /> : 'Add Branch'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBranchModal;
