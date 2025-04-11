
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Certificate from "./Certificate";
import CertificateForm from "./CertificateForm";
import CertificateActions from "./CertificateActions";

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    internName: "",
    internshipProgram: "",
    startDate: new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0],
    certificateId: `TECH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    companyName: "Tech Instance",
    duration: "1-month internship",
    signatoryName: "Ajay Kumar Yadav",
    signatoryPosition: "Tech Instance Coordinator",
    description: ""
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.internName || !formData.internshipProgram) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      return;
    }
    setShowCertificate(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // In a real application, this would show a share dialog
    // For now we'll use the navigator.share API if available
    if (navigator.share) {
      const baseUrl = window.location.origin;
      const verificationUrl = `${baseUrl}/verify?id=${formData.certificateId}`;
      
      navigator.share({
        title: `${formData.internName}'s Tech Instance Certificate`,
        text: `Verify ${formData.internName}'s Tech Instance certificate for ${formData.internshipProgram}.`,
        url: verificationUrl,
      })
      .then(() => {
        toast({
          title: "Shared successfully",
          description: "The certificate details have been shared."
        });
      })
      .catch((error) => {
        toast({
          title: "Share failed",
          description: "Unable to share certificate details."
        });
      });
    } else {
      toast({
        title: "Share Feature",
        description: "Sharing is not supported on this browser. Please use the copy verification link option instead."
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-8">
      {!showCertificate ? (
        <CertificateForm 
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div className="space-y-4">
          <CertificateActions 
            onEdit={() => setShowCertificate(false)}
            onPrint={handlePrint}
            onShare={handleShare}
            certificateId={formData.certificateId}
          />
          
          <div className="print:m-0 bg-white shadow-xl certificate-container">
            <Certificate 
              internName={formData.internName}
              internshipProgram={formData.internshipProgram}
              startDate={formatDate(formData.startDate)}
              endDate={formatDate(formData.endDate)}
              certificateId={formData.certificateId}
              companyName={formData.companyName}
              description={formData.description}
              duration={formData.duration}
              signatoryName={formData.signatoryName}
              signatoryPosition={formData.signatoryPosition}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
