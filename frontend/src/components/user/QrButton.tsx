import { useState } from 'react';
import QRCode from 'qrcode';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';

export default function QrButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Sample user and branch ID
  const userId=useParams(); // replace with actual user id

  // Function to generate the QR code
  const generateQrCode = async () => {
    try {
      // Convert the object to a JSON string for QR code generation
      const jsonString = JSON.stringify(userId);
      console.log("first")
      console.log(jsonString);
      const url = await QRCode.toDataURL(jsonString); // Generate QR code from the JSON string
      setQrCodeUrl(url);
      setModalIsOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      <button
        className="relative flex items-center justify-center"
        onClick={generateQrCode}
      >
        <div className="loader">
          <div className="box1"></div>
          <div className="box2"></div>
          <div className="box3"></div>
        </div>
        <span className="absolute text-white">Generate QR</span>
      </button>

      {/* Modal to display the generated QR code */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="QR Code Modal"
        className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="text-center">
          <h2 className="text-lg font-bold mb-4">Your QR Code</h2>
          {/* Display the generated QR code */}
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
