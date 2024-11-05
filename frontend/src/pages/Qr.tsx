import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


interface Scanner{
    scannerName:string;
    id:number;
    branchId:number;

}
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
            } catch (err:unknown) {
                //@ts-ignore
                setError(err);
            } finally {
                setLoader(false);
            }
        }

        fetchScanners();
    }, []);

    return { scanners, loader, error };
}

export default function Qr() {
    const { scanners, loader, error } = FetchScanners();
    const navigate = useNavigate();  

    if (loader) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            
    {scanners.map((scanner: Scanner) => (
        <button 
            key={scanner.id} 
            onClick={() => navigate(`/QrReader/${scanner.branchId}`)} 
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 m-10 h-20 w-20"
        >
            ID<br/>
            {scanner.branchId}  
        </button>
    ))}
</div>

    );
}
