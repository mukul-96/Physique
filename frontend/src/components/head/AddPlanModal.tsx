import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import Spinner from '../Spinner';

interface PlanModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ isOpen, closeModal }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [days, setDays] = useState<number | string>('');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const storedToken = localStorage.getItem('authorization') || localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
        alert('No authorization token found.');
        return;
      }
    try {
        setLoading(true);
      const response = await axios.post(`${BACKEND_URL}head/addplan`, {
        name,
        description,
        days: Number(days),
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.status === 200) {
        closeModal();
        alert('Plan added successfully!');
      }
      else
      {
        setError(response.data.message || 'Failed to add branch.');

      }
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan');
    }finally {
        setLoading(false);
      }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Add New Plan</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Plan Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="days" className="block text-sm font-medium text-gray-700">
                Number of Days
              </label>
              <input
                id="days"
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
{loading ? <Spinner /> : 'Add Plan'}              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default PlanModal;
