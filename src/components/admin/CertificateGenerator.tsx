
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

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    toast({
      title: "Certificate Downloaded",
      description: "The certificate has been saved to your device."
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Feature",
      description: "Sharing functionality would be implemented here."
    });
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
            onDownload={handleDownload}
            onShare={handleShare}
          />
          
          <div className="print:m-0 bg-white shadow-xl">
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
