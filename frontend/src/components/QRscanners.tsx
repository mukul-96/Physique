import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

interface Scanner {
    id: number;
    branchId: number;
}

function useFetchScanners() {
    const [scanners, setScanners] = useState<Scanner[]>([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchScanners() {
            try {
                const response = await fetch(`${BACKEND_URL}scanner/list`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch scanners');
                }
                const data: Scanner[] = await response.json();
                setScanners(data);  
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoader(false);
            }
        }

        fetchScanners();
    }, []);

    return { scanners, loader, error };
}

export default function QRscanners() {
    const { scanners, loader, error } = useFetchScanners();

    if (loader) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {scanners.map((scanner) => (
                <button key={scanner.id}> 
                    {scanner.branchId} 
                </button>
            ))}
        </div>
    );
}
