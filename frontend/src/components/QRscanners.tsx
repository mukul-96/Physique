import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

function FetchScanners() {
    const [scanners, setScanners] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchScanners() {
            try {
                const response = await fetch(`${BACKEND_URL}scanner/list`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch scanners');
                }
                const data = await response.json();
                setScanners(data);  
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoader(false);
            }
        }

        fetchScanners();
    }, []);

    return { scanners, loader, error };
}

export default function QRscanners() {
    const { scanners, loader, error } = FetchScanners();

    if (loader) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {scanners.map((scanner: any) => (
                <button key={scanner.id}> 
                    {scanner.branchId} 
                </button>
            ))}
        </div>
    );
}
