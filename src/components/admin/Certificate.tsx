
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
  // Create a properly formatted verification URL for the QR code
  const baseUrl = window.location.origin;
  const verificationUrl = `${baseUrl}/verify?id=${certificateId}`;
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white relative certificate-container">
      {/* Background with blue corners */}
      <div className="absolute inset-0 overflow-hidden">
        {/* White background with subtle pattern */}
        <div className="absolute inset-0 bg-white" 
             style={{backgroundImage: 'repeating-linear-gradient(45deg, #f9fafb, #f9fafb 10px, #ffffff 10px, #ffffff 20px)'}}></div>
        
        {/* Blue corners */}
        <div className="absolute left-0 bottom-0 h-56 w-56" 
             style={{background: 'linear-gradient(135deg, transparent 50%, #2563eb 50%)'}}></div>
        <div className="absolute right-0 bottom-0 h-56 w-56" 
             style={{background: 'linear-gradient(225deg, transparent 50%, #2563eb 50%)'}}></div>
        <div className="absolute left-0 top-0 h-56 w-56" 
             style={{background: 'linear-gradient(45deg, transparent 50%, #2563eb 50%)'}}></div>
        <div className="absolute right-0 top-0 h-56 w-56" 
             style={{background: 'linear-gradient(315deg, transparent 50%, #2563eb 50%)'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-10 m-2 border-0">
        <div className="flex justify-between items-center mb-10">
          {/* Company Logo */}
          <div className="w-36 h-36 flex items-center justify-center">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt="Company Logo" 
                className="max-h-36 max-w-36 object-contain"
              />
            ) : (
              <img 
                src="/lovable-uploads/ca6c923e-b023-417a-b86b-be983f0ddc84.png" 
                alt="Default Logo" 
                className="max-h-36 max-w-36 object-contain" 
              />
            )}
          </div>
          
          {/* Certificate Title */}
          <div className="text-center mx-6 flex-1">
            <h1 className="text-6xl font-bold text-blue-700 tracking-wider">CERTIFICATE</h1>
            <p className="text-xl text-blue-700 tracking-widest mt-1">OF COMPLETION</p>
          </div>
          
          {/* Gold Seal */}
          <div className="w-32 h-32 relative">
            <img 
              src="/lovable-uploads/d3af46c7-4827-4a9d-8936-b82e88096949.png" 
              alt="Gold Seal" 
              className="w-32 h-auto"
            />
          </div>
        </div>
        
        {/* Certificate text */}
        <div className="text-center mb-10">
          <p className="text-lg text-gray-700">This certificate is proudly presented to</p>
          <h2 className="text-5xl font-bold text-gray-900 mt-5 mb-8">{internName}</h2>
          <div className="border-b border-gray-300 w-4/5 mx-auto mb-8"></div>
        </div>
        
        <div className="text-center mb-12">
          <p className="text-lg leading-relaxed">
            for successfully completing a <span className="font-semibold">{duration}</span> internship from <span className="font-semibold">{startDate}</span>,
            to <span className="font-semibold">{endDate}</span>, in <span className="font-semibold">{internshipProgram}</span> at <span className="font-semibold">{companyName}</span>,
            showcasing commendable dedication and exceptional performance.
          </p>
        </div>
        
        <div className="flex justify-between items-end mt-24">
          {/* MSME Logo */}
          <div className="flex flex-col items-center max-w-[150px]">
            <img 
              src="/lovable-uploads/2d50e590-3e63-40b6-bedb-aa38f6b2dbcf.png"
              alt="MSME Logo"
              className="w-24 h-24"
            />
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
              <div className="h-16 mb-1 flex items-center justify-center">
                <span className="text-gray-500 italic">Digital Signature</span>
              </div>
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
        <div className="flex justify-center items-center mt-16 text-xs text-gray-600 space-x-6">
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
