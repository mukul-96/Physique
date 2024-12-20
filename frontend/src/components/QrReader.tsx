import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import QrScanner from "qr-scanner";
import QrFrame from "../utilities/images/qr-frame.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QrReader = () => {
  const branchId = useParams().id;
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    const scannedData = result?.data;
    setScannedResult(scannedData);

    if (!scannedData || !branchId) return;

    try {
      const url = `${BACKEND_URL}scanner/scan/${branchId}`;
      await axios.put(url, { qrData: scannedData });
      toast.success("Check-in successful, daily fee deducted");
    } catch (error) {
      const errorMessage =
      //@ts-ignore
        error.response?.data.message || "An error occurred during scanning.";
      toast.error(errorMessage);
      console.error("Error during PUT request:", error);
    }
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn) {
      toast.error(
        "Camera is blocked or not accessible. Please allow camera permissions and reload."
      );
    }
  }, [qrOn]);

  return (
    <div className="qr-reader">
      <ToastContainer />
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img src={QrFrame} alt="Qr Frame" width={256} height={256} className="qr-frame" />
      </div>
      {scannedResult && (
        <p style={{ position: "absolute", top: 0, left: 0, zIndex: 99999, color: "white" }}>
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QrReader;
