import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const RegisterScanner: React.FC = () => {
    const [scannerName, setScannerName] = useState('');
    const [token, setToken] = useState('');

    const registerScanner = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}scanner/register`, {
                scannerName,
            });
            setToken(response.data.token);
            alert('Scanner registered successfully. Token: ' + response.data.token);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert('Error: ' + (error.response?.data.message || 'Unexpected error'));
            } else {
                alert('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
            }
        }
    };

    return (
        <div>
            <h1>Register Scanner</h1>
            <input
                type="text"
                value={scannerName}
                onChange={(e) => setScannerName(e.target.value)}
                placeholder="Enter Scanner Name"
            />
            <button onClick={registerScanner}>Register</button>
            {token && <p>Scanner Token: {token}</p>}
        </div>
    );
};

export default RegisterScanner;
