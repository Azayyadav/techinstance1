
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
  internImage?: string;
  score?: string;
  assignments?: string;
  exam?: string;
  totalCandidates?: string;
  customDescription?: string;
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
  companyLogo,
  internImage,
  customDescription = ""
}) => {
  // Using relative URL for verification that works on the current domain
  // We'll switch to the custom domain once it's fully set up
  const verificationUrl = `/verify?id=${encodeURIComponent(certificateId)}`;
  
  return (
    <div className="certificate-container relative bg-white border border-gray-200 shadow-[0_0_15px_rgba(0,0,0,0.1)]">
      {/* Header */}
      <div className="flex justify-between items-center px-10 pt-8 pb-2 border-b border-gray-200">
        <div className="w-24 h-24">
          {companyLogo ? (
            <img src={companyLogo} alt="Company logo" className="w-full h-full object-contain" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              TI
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
            INTERNSHIP CERTIFICATE
          </h1>
        </div>
        
        <div className="w-24 h-24">
          {/* Removed image content */}
        </div>
      </div>
      
      {/* Certificate Content */}
      <div className="p-6 flex flex-col items-center">
        <div className="text-center mb-8 mt-4">
          <p className="text-xl italic">This certificate is awarded to</p>
          <h2 className="text-4xl font-bold my-4">{internName.toUpperCase()}</h2>
          <p className="text-xl italic">for successfully completing the course</p>
          <h3 className="text-3xl font-bold my-4">{internshipProgram}</h3>
        </div>
        
        {/* Intern Image */}
        {internImage && (
          <div className="absolute right-10 top-48 w-32 h-40 border border-gray-300">
            <img src={internImage} alt="Intern" className="w-full h-full object-cover" />
          </div>
        )}
        
        {/* Custom Description */}
        {customDescription && (
          <div className="text-center mb-6 mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed">{customDescription}</p>
          </div>
        )}
        
        <div className="flex justify-between w-full mt-4 px-10">
          <div className="text-left">
            <p className="text-lg">{startDate} - {endDate}</p>
            <p className="text-lg">({duration})</p>
          </div>
          
          <div className="text-center">
            {signatureImage ? (
              <img src={signatureImage} alt="Signature" className="h-16 mx-auto mb-1" />
            ) : (
              <div className="h-16 w-40 border-b border-gray-400 mb-1"></div>
            )}
            <p className="font-bold">{signatoryName}</p>
            <p className="text-sm">{signatoryPosition}</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-blue-900 text-white p-3 mt-4 flex justify-between items-center">
        <div>
          <p className="font-bold">UID: {certificateId}</p>
        </div>
        
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-md shadow-lg">
            <QRCodeCanvas 
              value={window.location.origin + verificationUrl}
              size={90}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
        
        <div>
          <p>www.techinstance.tech</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
