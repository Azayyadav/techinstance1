
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { mockCertificates } from "@/data/mockData";

const VerifyCertificate = () => {
  const [searchParams] = useSearchParams();
  const [certificateFound, setCertificateFound] = useState<boolean | null>(null);
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const certificateId = searchParams.get("id");

  useEffect(() => {
    // In a real application, this would be an API call
    const verifyCertificate = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        // Check if certificate exists in mock data
        const foundCertificate = mockCertificates.find(cert => cert.id === certificateId);
        
        if (foundCertificate) {
          setCertificateFound(true);
          setCertificate(foundCertificate);
        } else {
          setCertificateFound(false);
        }
        
        setLoading(false);
      }, 1000);
    };

    if (certificateId) {
      verifyCertificate();
    } else {
      setCertificateFound(false);
      setLoading(false);
    }
  }, [certificateId]);

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Certificate Verification</h1>
        
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Verification Result</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {loading ? (
                <div className="flex flex-col items-center py-8">
                  <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                  <p className="mt-4">Verifying certificate...</p>
                </div>
              ) : certificateFound ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Certificate Verified</h2>
                  <p className="text-gray-600 mb-6">This is an authentic certificate issued by Tech Instance.</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg w-full">
                    <div className="grid grid-cols-1 gap-2 text-left">
                      <div>
                        <p className="text-sm text-gray-500">Certificate ID</p>
                        <p className="font-medium">{certificate.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Issued To</p>
                        <p className="font-medium">{certificate.internName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Program</p>
                        <p className="font-medium">{certificate.program}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Issue Date</p>
                        <p className="font-medium">{certificate.issueDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-6 text-center">
                  <XCircle className="h-16 w-16 text-red-500 mb-4" />
                  <h2 className="text-2xl font-bold text-red-700 mb-2">Invalid Certificate</h2>
                  <p className="text-gray-600">
                    {certificateId 
                      ? `We couldn't verify the certificate with ID: ${certificateId}` 
                      : "No certificate ID was provided for verification."}
                  </p>
                  <p className="mt-4 text-gray-500">
                    If you believe this is an error, please contact Tech Instance support.
                  </p>
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
