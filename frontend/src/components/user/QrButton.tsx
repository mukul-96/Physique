import { useState } from 'react';
import QRCode from 'qrcode';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { FaQrcode } from 'react-icons/fa';

export default function QrButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const userId=useParams(); 

  // Function to generate the QR code
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
    <div className="bg-white hover:bg-slate-100 rounded-full ">
      <button
        className="relative flex items-center justify-center font-medium max-w-36 max-h-16"
        onClick={generateQrCode}
      >
        <div className="loader">
        </div>

<div className=" group absolute">
      <span className="text-5xl">
        <FaQrcode />
      </span>
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
