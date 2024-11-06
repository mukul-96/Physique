import { useState } from 'react';
import QRCode from 'qrcode';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';

export default function QrButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const userId=useParams(); 

  const generateQrCode = async () => {
    try {
      const jsonString = JSON.stringify(userId);
      console.log("first")
      console.log(jsonString);
      const url = await QRCode.toDataURL(jsonString);
      setQrCodeUrl(url);
      setModalIsOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" rounded-full ">
      <button
        className="relative flex items-center justify-center font-medium max-w-36 max-h-16"
        onClick={generateQrCode}
      >
        <div className="loader">
        </div>

<div className=" group absolute w-[5.125em] h-[5.125em] ">
        <svg
  viewBox="0 0 48 48"
  id="Layer_2"
  data-name="Layer 2"
  xmlns="http://www.w3.org/2000/svg"
  fill="#000000"
  stroke="#000000"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
  <g strokeLinecap="round" strokeLinejoin="round" id="SVGRepo_tracerCarrier"></g>
  <g id="SVGRepo_iconCarrier">
    <defs>
      <style>{`.cls-1 { fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; }`}</style>
    </defs>
    <path className="cls-1" d="M13.78,5.5H5.5v8.28"></path>
    <path className="cls-1" d="M42.5,13.78V5.5H34.22"></path>
    <path className="cls-1" d="M34.22,42.5H42.5V34.22"></path>
    <path className="cls-1" d="M10.55,26.41v11h11v-11h-11Zm3.22,3.22h4.6v4.6h-4.6Z"></path>
    <path className="cls-1" d="M10.55,10.55v11h11v-11h-11Zm3.22,3.22h4.6v4.6h-4.6Z"></path>
    <path className="cls-1" d="M26.41,10.55v11h11v-11h-11Zm3.22,3.22h4.6v4.6h-4.6Z"></path>
    <path
      className="cls-1"
      d="M31.93,37.45a5.79,5.79,0,0,0,3.47-2.1,8.37,8.37,0,0,0,2.05-5.72V26.41h-11v3.22h0a8.39,8.39,0,0,0,2.05,5.72A5.79,5.79,0,0,0,31.93,37.45Z"
    ></path>
    <path
      className="cls-1"
      d="M31.93,34.23a5.82,5.82,0,0,1-1.08-.86,5.4,5.4,0,0,1-1.22-3.74h4.6A5.4,5.4,0,0,1,33,33.37a5.82,5.82,0,0,1-1.08.86Z"
    ></path>
    <path className="cls-1" d="M5.5,34.22V42.5h8.28"></path>
  </g>
</svg>




      <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm py-1 px-2 rounded shadow-lg">
       Generate QR Code
      </div>
    </div>       
        
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="QR Code Modal"
        className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="text-center">
          <h2 className="text-lg font-bold mb-4">Your QR Code</h2>
          <img src={qrCodeUrl} alt="QR Code" className="mb-4" />
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
