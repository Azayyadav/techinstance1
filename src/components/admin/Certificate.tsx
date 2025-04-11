
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface CertificateProps {
  internName: string;
  internshipProgram: string;
  startDate: string;
  endDate: string;
  certificateId: string;
  companyName: string;
  description?: string;
  duration: string;
  signatoryName: string;
  signatoryPosition: string;
  signatureImage?: string;
}

const Certificate: React.FC<CertificateProps> = ({
  internName,
  internshipProgram,
  startDate,
  endDate,
  certificateId,
  companyName,
  description,
  duration,
  signatoryName,
  signatoryPosition,
  signatureImage
}) => {
  // Create a properly formatted verification URL for the QR code
  const baseUrl = window.location.origin;
  const verificationUrl = `${baseUrl}/verify?id=${certificateId}`;
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white relative certificate-container">
      {/* Modern blue gradient background with angled sections */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top and bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
        
        {/* White center */}
        <div className="absolute top-[40px] bottom-[40px] left-[40px] right-[40px] bg-white"></div>
        
        {/* Angled corners */}
        <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-blue-400 opacity-80" style={{ clipPath: 'polygon(0 60%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-blue-400 opacity-80" style={{ clipPath: 'polygon(100% 0, 100% 40%, 40% 0)' }}></div>
      </div>

      <div className="relative z-10 p-10 m-2 border-0">
        <div className="flex justify-between items-center mb-8">
          {/* Company Logo */}
          <img 
            src="/lovable-uploads/ca6c923e-b023-417a-b86b-be983f0ddc84.png" 
            alt="Tech Instance Logo" 
            className="h-20 w-auto" 
          />
          
          {/* Certificate Title */}
          <div className="text-center mx-6 flex-1">
            <h1 className="text-6xl font-bold text-blue-600 tracking-wider">CERTIFICATE</h1>
            <p className="text-xl text-blue-600 tracking-widest mt-1">OF COMPLETION</p>
          </div>
          
          {/* Award Seal */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-80"></div>
            <div className="absolute inset-2 rounded-full border-2 border-yellow-600 flex items-center justify-center">
              <span className="text-blue-900 font-bold text-xl">T/I</span>
            </div>
            <div className="absolute top-14 -right-2 w-10 h-14 bg-blue-600 opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)' }}></div>
          </div>
        </div>
        
        {/* Certificate text */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-700">This certificate is proudly presented to</p>
          <h2 className="text-5xl font-bold text-gray-900 mt-5 mb-3 border-b-2 border-gray-200 pb-2 max-w-2xl mx-auto">{internName}</h2>
        </div>
        
        <div className="text-center mb-12">
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            for successfully completing a <span className="font-semibold">{duration}</span> internship from <span className="font-semibold">{startDate}</span>,
            to <span className="font-semibold">{endDate}</span>, in <span className="font-semibold">{internshipProgram}</span> at <span className="font-semibold">{companyName}</span>,
            showcasing commendable dedication and exceptional performance.
          </p>
        </div>
        
        <div className="flex items-end justify-between mt-16">
          {/* MSME Logo */}
          <div className="flex flex-col items-center max-w-[150px]">
            <img 
              src="/lovable-uploads/2d50e590-3e63-40b6-bedb-aa38f6b2dbcf.png"
              alt="MSME Logo"
              className="w-24 h-24"
            />
            <p className="text-xs text-gray-600 mt-1">MSME REGISTERED</p>
          </div>
          
          {/* Signature Section */}
          <div className="text-center">
            <p className="text-lg mb-1">Best Regards,</p>
            {signatureImage ? (
              <img 
                src={signatureImage} 
                alt="Signature" 
                className="h-16 mx-auto mb-1"
              />
            ) : (
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA2CAYAAACgpRmuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADnUlEQVR4nO3dz0sUYRwH8O/3mXF21l11V/TX+qNIKugQdOgUUUQQHbpLEHioo0V0CPwPIjAi6lxQRAdPQRHdugREBhHRoSKiMILUyk3dXXdnd54OQxtB5cw4+515Pqfhfd/Z73x5mGfmmQcQERERERERERERERERERERERERERERERERERERERFZwsb7BZLb+fh+c6FYPC8iG4mohYi2nRZUbdf4/uf+kcLn3Pv+IVdhGmBEZ1Zi8kQ6nVnabZiRWDQYKAQH97Z3PIiGw3NuAjXBmNs3K9G9z3/r57TbMCLSLCJfROQ5EZ2e2LIM+moGSCTbzoiAxlNSYqqxajCDHnYbRkQ6oygctSTvANg8njKM4L5hXgtFIhkiog163I0IuR5KjLpSKW+PahFpGu9rzICN+0E1rzTb2t8Bg1NaPUDEDBijB13V6UTk1PiLMgdXEAP0QyRzMzIcHS1Ex4vpXFrHRABQVJwvrQC7uWKYhaVepHl+qPtRz6H7N253toTCBUEhDwAAFZ5UlEWR55cB8CwTwyAs9QG+15Uc6lUPrXl+ECDDy36hX45Elq5zGE9EQw2xSG49gJrtiDDG2dPNJHI9u39wlbIZCOiqFLihbEZGZ4gk9OjoSr9/UCwaDP8mkhlunu2TJxapKakFYKMMNODfGWSVeddzJNJzvaH3wcjL4zd6eseM5z8soDXK3PYFwUVbA0/XnNgwm/lX1s26s7qEgD6dXh3tU4qzDXV17xSNfFc2q0NJVupyy0rHohYAaBqN+AqgXtnNjD5QZv5yJDj0WreTF8/m1umYGTWKA0ryXaWzWq0NcdCjVmuDb8uPi0pxUreTF89mrQBQJMrxaTnZhgUgJ1yN3r25Y6dBALS6GQziJKAsz7kJo8w2nEhclEN9Mza3ZLo/Axz0AUkDyLgOJ7NjI0QFo8jv0nxgaSi7q2X3Oru1q/Nmd0d7e0u9X3oQCNT5/UEf9/kEiu8eFJ+devofZutCP0uxmFZI/UyPQ2QFl1kvRaT44WpAcPn/FcbYfAAzteOpx9g8AE5vCKXs9qzkrJYMD28JMJ5dwcT9BxNPItFWXeoh9g/+D5Ig732mTQ/XcX5ERD0icnGiCzLkx8wzCMsB+Hhf2UzdApBxOVLvEzgOYG0lCjNgz1eQX0hD4oIlcnrTrSa7tQjtaByITqOwOQDrtRVmQC1UEDKs88Wx/rP/WtLYYrPQbpurVUIOikgHAGN+cmAWKggRERERERERERERERERERERERH9CT8AVUmpVzAaLBIAAAAASUVORK5CYII="
                alt="Signature" 
                className="h-16 mx-auto mb-1"
              />
            )}
            <p className="text-base font-bold">{signatoryName}</p>
            <p className="text-sm text-gray-600">{signatoryPosition}</p>
          </div>
          
          {/* QR Code */}
          <div className="text-center max-w-[150px]">
            <QRCodeCanvas 
              value={verificationUrl} 
              size={120} 
              bgColor="#ffffff" 
              fgColor="#000000" 
              level="H" 
              includeMargin={false}
            />
            <p className="text-xs text-gray-600 mt-1">Scan to verify</p>
            <p className="text-xs text-gray-600">ID: {certificateId.substring(0, 15)}</p>
          </div>
        </div>
        
        {/* Footer with contact details */}
        <div className="flex justify-between items-center mt-16 text-xs text-gray-600">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-1 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            www.techinstance.tech
          </div>
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-1 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            technologyinstance@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
