
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { verifyCertificate, Certificate } from "@/data/certificatesData";

const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const [certificateFound, setCertificateFound] = useState<boolean | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);

  const certificateId = searchParams.get("id");

  useEffect(() => {
    const performVerification = () => {
      setLoading(true);
      console.log("Verifying certificate ID:", certificateId);
      
      setTimeout(() => {
        if (certificateId) {
          try {
            // First try to decode the ID in case it's URL-encoded
            const decodedId = decodeURIComponent(certificateId);
            console.log("Decoded certificate ID:", decodedId);
            
            const foundCertificate = verifyCertificate(decodedId);
            console.log("Found certificate:", foundCertificate);
            
            if (foundCertificate) {
              setCertificateFound(true);
              setCertificate(foundCertificate);
            } else {
              setCertificateFound(false);
            }
          } catch (error) {
            console.error("Error verifying certificate:", error);
            setCertificateFound(false);
          }
        } else {
          setCertificateFound(false);
        }
        
        setLoading(false);
      }, 1000);
    };

    performVerification();
  }, [certificateId]);

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700">Certificate Verification</h1>
            <p className="text-gray-600 mt-2">Verify the authenticity of a Tech Instance certificate</p>
          </div>
          
          <Card className="shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-2"></div>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-center text-blue-700">Verification Result</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center p-8">
              {loading ? (
                <div className="flex flex-col items-center py-12">
                  <div className="h-16 w-16 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                  <p className="mt-6 text-lg">Verifying certificate...</p>
                  <p className="text-sm text-gray-500 mt-2">Please wait while we check our records</p>
                </div>
              ) : certificateFound ? (
                <div className="flex flex-col items-center py-6 text-center w-full">
                  <div className="bg-green-50 rounded-full p-4 mb-4 shadow-md">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Certificate Verified</h2>
                  <p className="text-gray-600 mb-8 max-w-lg">This is an authentic certificate issued by Tech Instance.</p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg w-full border shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
                        <p className="font-medium text-gray-800">{certificate?.id}</p>
                      </div>
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Issued To</p>
                        <p className="font-medium text-gray-800">{certificate?.internName}</p>
                      </div>
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Program</p>
                        <p className="font-medium text-gray-800">{certificate?.internshipProgram}</p>
                      </div>
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Issue Date</p>
                        <p className="font-medium text-gray-800">{new Date(certificate?.issueDate || "").toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</p>
                      </div>
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Started On</p>
                        <p className="font-medium text-gray-800">{new Date(certificate?.startDate || "").toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</p>
                      </div>
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Completed On</p>
                        <p className="font-medium text-gray-800">{new Date(certificate?.endDate || "").toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center">
                    <div className="bg-blue-50 rounded-full p-2 mr-2 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="text-blue-700">This certificate has been tech instance verified</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-6 text-center w-full">
                  <div className="bg-red-50 rounded-full p-4 mb-4 shadow-md">
                    <XCircle className="h-16 w-16 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-700 mb-2">Invalid Certificate</h2>
                  <p className="text-gray-600 max-w-lg">
                    {certificateId 
                      ? `We couldn't verify the certificate with ID: ${certificateId}` 
                      : "No certificate ID was provided for verification."}
                  </p>
                  <p className="mt-6 text-gray-500 max-w-md">
                    If you believe this is an error, please contact Tech Instance support at <span className="text-blue-600">technologyinstance@gmail.com</span>.
                  </p>
                  
                  <div className="mt-6 bg-amber-50 p-4 rounded-md flex items-start max-w-md shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-amber-800">Warning</p>
                      <p className="text-xs text-amber-700 mt-1">
                        If you received this certificate from someone, it may be counterfeit. Please verify with the issuing organization directly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyCertificate;
