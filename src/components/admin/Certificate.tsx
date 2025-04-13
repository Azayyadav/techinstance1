
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
  companyLogo?: string;
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
  signatureImage,
  companyLogo
}) => {
  // Using custom domain for verification instead of the Lovable app URL
  const verificationUrl = `https://www.techinstance.tech/verify?id=${certificateId}`;
  
  return (
    <div className="certificate-container relative bg-white">
      {/* Blue corner accents */}
      <div className="blue-corners absolute inset-0">
        <div className="top-left"></div>
        <div className="top-right"></div>
        <div className="bottom-left"></div>
        <div className="bottom-right"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8 m-2">
        {/* Header with small thumbnails */}
        <div className="flex justify-between mb-10">
          <div className="w-20 h-20 bg-gray-100 p-1">
            {companyLogo && (
              <img src={companyLogo} alt="Company logo" className="w-full h-full object-contain" />
            )}
          </div>
          <div className="w-20 h-20 bg-gray-100 p-1">
            {companyLogo && (
              <img src={companyLogo} alt="Company logo" className="w-full h-full object-contain" />
            )}
          </div>
        </div>
        
        {/* Certificate Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-blue-600 tracking-wider">CERTIFICATE</h1>
          <p className="text-xl text-blue-600">OF COMPLETION</p>
        </div>
        
        {/* Certificate Text */}
        <div className="text-center mb-8">
          <p className="text-lg">This certificate is proudly presented to</p>
        </div>
        
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold">{internName}</h2>
          <div className="border-b border-gray-300 w-4/5 mx-auto my-6"></div>
        </div>
        
        <div className="text-center mb-16">
          <p className="text-lg leading-relaxed">
            for successfully completing a {duration} internship from {startDate}, to {endDate}, 
            <br />in {internshipProgram} at {companyName}, showcasing commendable dedication and exceptional performance.
          </p>
        </div>
        
        {/* Signature Section */}
        <div className="flex justify-between items-end mt-16">
          {/* Left Thumbnail */}
          <div className="w-20 h-20 bg-gray-100 p-1">
            {companyLogo && (
              <img src={companyLogo} alt="Company logo" className="w-full h-full object-contain" />
            )}
          </div>
          
          {/* Signature */}
          <div className="text-center">
            <p className="text-lg mb-2">Best Regards,</p>
            {signatureImage ? (
              <img src={signatureImage} alt="Signature" className="h-12 mx-auto mb-1" />
            ) : (
              <p className="italic text-gray-500 mb-1">Digital Signature</p>
            )}
            <p className="font-bold">{signatoryName}</p>
            <p className="text-sm text-gray-600">{signatoryPosition}</p>
          </div>
          
          {/* QR Code */}
          <div className="text-center">
            <QRCodeCanvas 
              value={verificationUrl}
              size={100}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
            <p className="text-xs text-gray-600 mt-1">Scan to verify</p>
            <p className="text-xs text-gray-600">{certificateId.substring(0, 10)}</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-center items-center mt-12 space-x-6 text-sm">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full p-1 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            www.techinstance.tech
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full p-1 mr-2">
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
