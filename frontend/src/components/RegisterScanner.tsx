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
        } catch (error: any) {
            if (error.response) {
                alert('Error: ' + error.response.data.message);
            } else if (error.request) {
                alert('Error: No response from server');
            } else {
                alert('Error: ' + error.message);
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
