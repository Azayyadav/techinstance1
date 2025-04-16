
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
  customDescription = "",
  score,
  assignments,
  exam,
  totalCandidates
}) => {
  // Using a custom domain for verification that looks professional
  const verificationUrl = `https://techinstance.com/verify?id=${encodeURIComponent(certificateId)}`;
  
  return (
    <div className="certificate-container relative bg-gradient-to-r from-white to-blue-50 border border-gray-200 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
      {/* Blue corners for elegant design */}
      <div className="blue-corners pointer-events-none">
        <div className="top-left"></div>
        <div className="top-right"></div>
        <div className="bottom-left"></div>
        <div className="bottom-right"></div>
      </div>
      
      {/* Header */}
      <div className="flex justify-between items-center px-10 pt-8 pb-2 border-b border-gray-200">
        <div className="w-24 h-24">
          {companyLogo ? (
            <img src={companyLogo} alt="Company logo" className="w-full h-full object-contain" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-it-blue-dark to-it-blue text-white flex items-center justify-center text-4xl font-bold shadow-md">
              TI
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-it-blue-dark to-it-blue-light bg-clip-text">
            INTERNSHIP CERTIFICATE
          </h1>
        </div>
        
        <div className="w-24 h-24">
          {/* Placeholder for additional logo if needed */}
        </div>
      </div>
      
      {/* Certificate Content */}
      <div className="p-6 flex flex-col items-center">
        <div className="text-center mb-8 mt-4">
          <p className="text-xl italic text-gray-600">This certificate is awarded to</p>
          <h2 className="text-4xl font-bold my-4 text-it-blue-dark">{internName.toUpperCase()}</h2>
          <p className="text-xl italic text-gray-600">for successfully completing the course</p>
          <h3 className="text-3xl font-bold my-4 text-it-blue">{internshipProgram}</h3>
        </div>
        
        {/* Intern Image */}
        {internImage && (
          <div className="absolute right-10 top-48 w-32 h-40 border border-gray-300 shadow-md overflow-hidden">
            <img src={internImage} alt="Intern" className="w-full h-full object-cover" />
          </div>
        )}
        
        {/* Custom Description */}
        {customDescription && (
          <div className="text-center mb-6 mx-auto max-w-3xl">
            <p className="text-lg leading-relaxed text-gray-700">{customDescription}</p>
          </div>
        )}
        
        {/* Performance details if provided */}
        {(score || assignments || exam || totalCandidates) && (
          <div className="w-full max-w-2xl mb-6 mt-2 px-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              {score && (
                <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Overall Score</p>
                  <p className="text-lg font-semibold text-it-blue-dark">{score}</p>
                </div>
              )}
              {assignments && (
                <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Assignments</p>
                  <p className="text-lg font-semibold text-it-blue-dark">{assignments}</p>
                </div>
              )}
              {exam && (
                <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Final Examination</p>
                  <p className="text-lg font-semibold text-it-blue-dark">{exam}</p>
                </div>
              )}
              {totalCandidates && (
                <div className="bg-blue-50 p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Batch Size</p>
                  <p className="text-lg font-semibold text-it-blue-dark">{totalCandidates}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between w-full mt-4 px-10">
          <div className="text-left">
            <p className="text-lg text-gray-700">{startDate} - {endDate}</p>
            <p className="text-lg text-gray-700">({duration})</p>
          </div>
          
          <div className="text-center">
            {signatureImage ? (
              <img src={signatureImage} alt="Signature" className="h-16 mx-auto mb-1" />
            ) : (
              <div className="h-16 w-40 border-b border-gray-400 mb-1"></div>
            )}
            <p className="font-bold text-gray-800">{signatoryName}</p>
            <p className="text-sm text-gray-600">{signatoryPosition}</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gradient-to-r from-it-blue-dark to-it-blue text-white p-3 mt-4 flex justify-between items-center">
        <div>
          <p className="font-bold">UID: {certificateId}</p>
        </div>
        
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-md shadow-lg">
            <QRCodeCanvas 
              value={verificationUrl}
              size={90}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              includeMargin={true}
              className="rounded-md"
            />
          </div>
        </div>
        
        <div>
          <p className="font-semibold">WWW.TECHINSTANCE.COM</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
