
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
  signatoryPosition
}) => {
  const verificationUrl = `https://techinstance.com/verify?id=${certificateId}`;
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white relative overflow-hidden">
      {/* Background with blue corners */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-blue-700 to-blue-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-blue-700 to-blue-500"></div>
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-b from-blue-700 to-blue-500"></div>
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-b from-blue-700 to-blue-500"></div>
      </div>

      <div className="relative z-10 p-8 border-8 border-double border-gray-200">
        <div className="flex justify-between items-start mb-6">
          <img 
            src="/lovable-uploads/fc954afd-6aaf-49e1-9edf-c7b62d8cc66f.png" 
            alt="Tech Instance Logo" 
            className="h-20 w-auto" 
          />
          <div className="text-center flex-1">
            <h1 className="text-5xl font-bold text-blue-700">CERTIFICATE</h1>
            <p className="text-xl text-blue-700 mt-2">OF COMPLETION</p>
          </div>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-800">This certificate is proudly presented to</p>
          <p className="text-4xl font-bold text-gray-900 mt-4 mb-4">{internName}</p>
        </div>
        
        <div className="text-center mb-8 px-12">
          <p className="text-lg">
            For successfully completing a {duration} from {startDate} to {endDate} in {internshipProgram} at {companyName}, {internName.split(" ")[0]} demonstrated strong dedication, technical skills, and valuable contributions to real-world projects.
          </p>
          <p className="text-lg mt-2">
            We appreciate {internName.split(" ")[0]}'s efforts and wish him continued success.
          </p>
        </div>
        
        <div className="flex items-end justify-between mt-16">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/fc954afd-6aaf-49e1-9edf-c7b62d8cc66f.png" 
              alt="MSME Logo"
              className="w-20 h-20 mb-1"
            />
            <p className="text-xs text-gray-600">MSME REGISTERED</p>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold mb-1">Best Regards,</p>
            <img 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAA2CAYAAACgpRmuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADnUlEQVR4nO3dz0sUYRwH8O/3mXF21l11V/TX+qNIKugQdOgUUUQQHbpLEHioo0V0CPwPIjAi6lxQRAdPQRHdugREBhHRoSKiMILUyk3dXXdnd54OQxtB5cw4+515Pqfhfd/Z73x5mGfmmQcQERERERERERERERERERERERERERERERERERERERFZwsb7BZLb+fh+c6FYPC8iG4mohYi2nRZUbdf4/uf+kcLn3Pv+IVdhGmBEZ1Zi8kQ6nVnabZiRWDQYKAQH97Z3PIiGw3NuAjXBmNs3K9G9z3/r57TbMCLSLCJfROQ5EZ2e2LIM+moGSCTbzoiAxlNSYqqxajCDHnYbRkQ6oygctSTvANg8njKM4L5hXgtFIhkiog163I0IuR5KjLpSKW+PahFpGu9rzICN+0E1rzTb2t8Bg1NaPUDEDBijB13V6UTk1PiLMgdXEAP0QyRzMzIcHS1Ex4vpXFrHRABQVJwvrQC7uWKYhaVepHl+qPtRz6H7N253toTCBUEhDwAAFZ5UlEWR55cB8CwTwyAs9QG+15Uc6lUPrXl+ECDDy36hX45Elq5zGE9EQw2xSG49gJrtiDDG2dPNJHI9u39wlbIZCOiqFLihbEZGZ4gk9OjoSr9/UCwaDP8mkhlunu2TJxapKakFYKMMNODfGWSVeddzJNJzvaH3wcjL4zd6eseM5z8soDXK3PYFwUVbA0/XnNgwm/lX1s26s7qEgD6dXh3tU4qzDXV17xSNfFc2q0NJVupyy0rHohYAaBqN+AqgXtnNjD5QZv5yJDj0WreTF8/m1umYGTWKA0ryXaWzWq0NcdCjVmuDb8uPi0pxUreTF89mrQBQJMrxaTnZhgUgJ1yN3r25Y6dBALS6GQziJKAsz7kJo8w2nEhclEN9Mza3ZLo/Axz0AUkDyLgOJ7NjI0QFo8jv0nxgaSi7q2X3Oru1q/Nmd0d7e0u9X3oQCNT5/UEf9/kEiu8eFJ+devofZutCP0uxmFZI/UyPQ2QFl1kvRaT44WpAcPn/FcbYfAAzteOpx9g8AE5vCKXs9qzkrJYMD28JMJ5dwcT9BxNPItFWXeoh9g/+D5Ig732mTQ/XcX5ERD0icnGiCzLkx8wzCMsB+Hhf2UzdApBxOVLvEzgOYG0lCjNgz1eQX0hD4oIlcnrTrSa7tQjtaByITqOwOQDrtRVmQC1UEDKs88Wx/rP/WtLYYrPQbpurVUIOikgHAGN+cmAWKggRERERERERERERERERERERERH9CT8AVUmpVzAaLBIAAAAASUVORK5CYII=" 
              alt="Signature" 
              className="h-12 mx-auto mb-1"
            />
            <p className="text-base font-bold">{signatoryName}</p>
            <p className="text-sm text-gray-600">{signatoryPosition}</p>
          </div>
          
          <div className="text-center">
            <QRCodeCanvas 
              value={verificationUrl} 
              size={120} 
              bgColor="#ffffff" 
              fgColor="#000000" 
              level="H" 
              includeMargin={false}
            />
            <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-10 text-xs text-gray-500">
          <div>
            <p>www.techinstance.tech</p>
          </div>
          <div>
            <p>technologyinstance@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
