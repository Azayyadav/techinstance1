
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Certificate from "./Certificate";
import CertificateForm from "./CertificateForm";
import CertificateActions from "./CertificateActions";
import CertificateImageUpload from "./CertificateImageUpload";
import CertificatePerformanceDetails from "./CertificatePerformanceDetails";
import CertificateCustomDescription from "./CertificateCustomDescription";
import CertificatePreview from "./CertificatePreview";
import { addCertificate, updateCertificate, Certificate as CertificateType } from "@/data/certificatesData";

interface CertificateGeneratorProps {
  onCertificateGenerated?: (certificate: CertificateType) => void;
  existingCertificate?: CertificateType | null;
  isEditMode?: boolean;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ 
  onCertificateGenerated, 
  existingCertificate = null,
  isEditMode = false
}) => {
  const [formData, setFormData] = useState({
    internName: "",
    internshipProgram: "",
    startDate: new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0],
    certificateId: `TECH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    companyName: "Tech Instance",
    duration: "1-month",
    signatoryName: "Ajay Kumar Yadav",
    signatoryPosition: "Tech Instance Coordinator",
    description: "",
    score: "75",
    assignments: "20/25",
    exam: "55/75",
    totalCandidates: "537",
    customDescription: "For successfully completing a 1-month internship from 25th December, 2024 to 25th January, 2025 in React Native & Appwrite at Tech Instance, Sahil demonstrated strong dedication, technical skills, and valuable contributions to real-world projects.\n\nWe appreciate Sahil's efforts and wish him continued success."
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const [signatureImage, setSignatureImage] = useState<string | undefined>(undefined);
  const [companyLogo, setCompanyLogo] = useState<string | undefined>(undefined);
  const [internImage, setInternImage] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  // Initialize form data when editing an existing certificate
  useEffect(() => {
    if (existingCertificate && isEditMode) {
      setFormData({
        internName: existingCertificate.internName,
        internshipProgram: existingCertificate.internshipProgram,
        startDate: existingCertificate.startDate,
        endDate: existingCertificate.endDate,
        certificateId: existingCertificate.id,
        companyName: existingCertificate.companyName,
        duration: existingCertificate.duration,
        signatoryName: "Ajay Kumar Yadav", // Default values since these aren't stored in DB model
        signatoryPosition: "Tech Instance Coordinator",
        description: "",
        score: existingCertificate.score || "75",
        assignments: existingCertificate.assignments || "20/25",
        exam: existingCertificate.exam || "55/75",
        totalCandidates: existingCertificate.totalCandidates || "537",
        customDescription: existingCertificate.customDescription || "For successfully completing a 1-month internship from 25th December, 2024 to 25th January, 2025 in React Native & Appwrite at Tech Instance, Sahil demonstrated strong dedication, technical skills, and valuable contributions to real-world projects.\n\nWe appreciate Sahil's efforts and wish him continued success."
      });
      
      if (existingCertificate.internImage) {
        setInternImage(existingCertificate.internImage);
      }
    }
  }, [existingCertificate, isEditMode]);

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

    // Create or update certificate
    const certificate: CertificateType = {
      id: formData.certificateId,
      internName: formData.internName,
      internshipProgram: formData.internshipProgram,
      startDate: formData.startDate,
      endDate: formData.endDate,
      companyName: formData.companyName,
      duration: formData.duration,
      issueDate: isEditMode && existingCertificate ? existingCertificate.issueDate : new Date().toISOString().split('T')[0],
      status: isEditMode && existingCertificate ? existingCertificate.status : "Active",
      score: formData.score,
      assignments: formData.assignments,
      exam: formData.exam,
      totalCandidates: formData.totalCandidates,
      internImage: internImage,
      customDescription: formData.customDescription
    };

    if (isEditMode && existingCertificate) {
      // Update existing certificate
      updateCertificate(certificate.id, certificate);
    } else {
      // Add new certificate
      addCertificate(certificate);
    }
    
    if (onCertificateGenerated) {
      onCertificateGenerated(certificate);
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
      // Get the current domain for verification
      const currentDomain = window.location.origin;
      const verificationUrl = `${currentDomain}/verify?id=${formData.certificateId}`;
      
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

  const handleCustomDescriptionChange = (description: string) => {
    setFormData(prev => ({ ...prev, customDescription: description }));
  };

  const handlePerformanceChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      {!showCertificate ? (
        <div className="space-y-6">
          <CertificateForm 
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleSubmit={handleSubmit}
            isEditMode={isEditMode}
          />
          
          {/* Preview Button */}
          <div className="flex justify-end mb-4">
            <CertificatePreview 
              formData={formData}
              signatureImage={signatureImage}
              companyLogo={companyLogo}
              internImage={internImage}
              formatDate={formatDate}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Company Logo Upload */}
            <CertificateImageUpload
              title="Company Logo"
              id="logo-upload"
              description="Recommended: PNG with transparent background"
              currentImage={companyLogo}
              onImageUpload={setCompanyLogo}
            />

            {/* Signature Upload */}
            <CertificateImageUpload
              title="Signature Image"
              id="signature-upload"
              description="Recommended: Transparent PNG with black signature"
              currentImage={signatureImage}
              onImageUpload={setSignatureImage}
            />
            
            {/* Intern Photo Upload */}
            <CertificateImageUpload
              title="Intern Photo"
              id="intern-photo-upload"
              description="Recommended: Professional headshot"
              currentImage={internImage}
              onImageUpload={setInternImage}
            />
          </div>
          
          {/* Performance Details */}
          <CertificatePerformanceDetails
            score={formData.score}
            totalCandidates={formData.totalCandidates}
            assignments={formData.assignments}
            exam={formData.exam}
            onFieldChange={handlePerformanceChange}
          />
          
          {/* Custom Description Field */}
          <CertificateCustomDescription
            customDescription={formData.customDescription}
            onDescriptionChange={handleCustomDescriptionChange}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <CertificateActions 
            onEdit={() => setShowCertificate(false)}
            onPrint={handlePrint}
            onShare={handleShare}
            certificateId={formData.certificateId}
          />
          
          <div className="print:m-0 shadow-xl certificate-container">
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
              signatureImage={signatureImage}
              companyLogo={companyLogo}
              internImage={internImage}
              score={formData.score}
              assignments={formData.assignments}
              exam={formData.exam}
              totalCandidates={formData.totalCandidates}
              customDescription={formData.customDescription}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
