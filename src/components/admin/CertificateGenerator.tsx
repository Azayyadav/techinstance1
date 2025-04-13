
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Certificate from "./Certificate";
import CertificateForm from "./CertificateForm";
import CertificateActions from "./CertificateActions";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [previewOpen, setPreviewOpen] = useState(false);
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
      const verificationUrl = `https://www.techinstance.tech/verify?id=${formData.certificateId}`;
      
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

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setSignatureImage(event.target.result);
          toast({
            title: "Signature uploaded",
            description: "Your signature has been successfully uploaded."
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setCompanyLogo(event.target.result);
          toast({
            title: "Logo uploaded",
            description: "Company logo has been successfully uploaded."
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleInternImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setInternImage(event.target.result);
          toast({
            title: "Intern photo uploaded",
            description: "Intern photo has been successfully uploaded."
          });
        }
      };
      
      reader.readAsDataURL(file);
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
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Preview Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Certificate Preview</DialogTitle>
                </DialogHeader>
                <div className="overflow-auto max-h-[80vh]">
                  <Certificate 
                    internName={formData.internName || "INTERN NAME"}
                    internshipProgram={formData.internshipProgram || "INTERNSHIP PROGRAM"}
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
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Company Logo Upload */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Upload Company Logo</h3>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <Label htmlFor="logo-upload" className="block mb-2">Choose company logo</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="w-1/3"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Select File
                    </Button>
                    
                    <div className="border rounded-md h-24 w-24 flex items-center justify-center bg-gray-50">
                      {companyLogo ? (
                        <img 
                          src={companyLogo} 
                          alt="Logo Preview" 
                          className="max-h-20 max-w-20 object-contain"
                        />
                      ) : (
                        <p className="text-xs text-gray-400">No logo</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: PNG with transparent background
                  </p>
                </div>
              </div>
            </div>

            {/* Signature Upload */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Upload Signature Image</h3>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <Label htmlFor="signature-upload" className="block mb-2">Choose signature image</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="signature-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleSignatureUpload}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('signature-upload')?.click()}
                      className="w-1/3"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Select File
                    </Button>
                    
                    <div className="border rounded-md h-24 w-36 flex items-center justify-center bg-gray-50">
                      {signatureImage ? (
                        <img 
                          src={signatureImage} 
                          alt="Signature Preview" 
                          className="max-h-20 max-w-32 object-contain"
                        />
                      ) : (
                        <p className="text-xs text-gray-400">No signature</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: Transparent PNG with black signature
                  </p>
                </div>
              </div>
            </div>
            
            {/* Intern Photo Upload */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Upload Intern Photo</h3>
              <div className="flex items-center gap-4">
                <div className="w-full">
                  <Label htmlFor="intern-photo-upload" className="block mb-2">Choose intern photo</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="intern-photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleInternImageUpload}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById('intern-photo-upload')?.click()}
                      className="w-1/3"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Select File
                    </Button>
                    
                    <div className="border rounded-md h-32 w-24 flex items-center justify-center bg-gray-50">
                      {internImage ? (
                        <img 
                          src={internImage} 
                          alt="Intern Photo Preview" 
                          className="max-h-30 max-w-22 object-cover"
                        />
                      ) : (
                        <p className="text-xs text-gray-400">No photo</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: Professional headshot
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Certificate Fields */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Performance Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="score" className="block mb-2">Overall Score (%)</Label>
                <Input
                  id="score"
                  name="score"
                  type="text"
                  value={formData.score}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="totalCandidates" className="block mb-2">Total Candidates</Label>
                <Input
                  id="totalCandidates"
                  name="totalCandidates"
                  type="text"
                  value={formData.totalCandidates}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="assignments" className="block mb-2">Online Assignments (e.g. 20/25)</Label>
                <Input
                  id="assignments"
                  name="assignments"
                  type="text"
                  value={formData.assignments}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="exam" className="block mb-2">Proctored Exam (e.g. 55/75)</Label>
                <Input
                  id="exam"
                  name="exam"
                  type="text"
                  value={formData.exam}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Custom Description Field */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-4">Custom Certificate Description</h3>
            <div>
              <Label htmlFor="customDescription" className="block mb-2">Description Text</Label>
              <Textarea
                id="customDescription"
                name="customDescription"
                value={formData.customDescription}
                onChange={handleChange}
                className="w-full min-h-[150px]"
                placeholder="Enter a custom description for the certificate..."
              />
              <p className="text-xs text-gray-500 mt-2">
                This text will be displayed prominently on the certificate. Include details about the internship experience.
              </p>
            </div>
          </div>
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
