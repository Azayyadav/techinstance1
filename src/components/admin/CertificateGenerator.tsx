
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Certificate from "./Certificate";
import CertificateForm from "./CertificateForm";
import CertificateActions from "./CertificateActions";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    internName: "",
    internshipProgram: "",
    startDate: new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0], // 30 days ago
    endDate: new Date().toISOString().split('T')[0],
    certificateId: `TECH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    companyName: "Tech Instance",
    duration: "3-month internship",
    signatoryName: "Ajay Kumar Yadav",
    signatoryPosition: "Tech Instance Coordinator",
    description: ""
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const [signatureImage, setSignatureImage] = useState<string | undefined>(undefined);
  const [companyLogo, setCompanyLogo] = useState<string | undefined>(undefined);
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
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
