
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, Printer, Share2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

interface CertificateProps {
  internName: string;
  internshipProgram: string;
  completionDate: string;
  certificateId: string;
  companyName: string;
}

const Certificate = ({ 
  internName, 
  internshipProgram, 
  completionDate, 
  certificateId,
  companyName
}: CertificateProps) => {
  const verificationUrl = `https://techinstance.com/verify?id=${certificateId}`;
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white border-8 border-double border-gray-300 p-8 shadow-lg">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <Award className="h-16 w-16 text-it-blue" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Certificate of Completion</h1>
        <p className="text-lg text-gray-600 mt-2">This certifies that</p>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-it-blue border-b-2 border-gray-300 pb-2 inline-block">{internName}</p>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-lg">has successfully completed the</p>
        <p className="text-2xl font-semibold mt-2">{internshipProgram}</p>
        <p className="text-lg mt-2">at {companyName}</p>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-lg">Completed on: {completionDate}</p>
        <p className="text-sm text-gray-600 mt-2">Certificate ID: {certificateId}</p>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-lg font-bold">John Smith</p>
          <p className="text-gray-600">Chief Executive Officer</p>
        </div>
        <div className="text-center">
          <QRCodeCanvas 
            value={verificationUrl} 
            size={120} 
            bgColor="#ffffff" 
            fgColor="#000000" 
            level="H" 
            includeMargin={false}
          />
          <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
        </div>
      </div>
    </div>
  );
};

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    internName: "",
    internshipProgram: "",
    completionDate: new Date().toISOString().split('T')[0],
    certificateId: `TECH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
  });
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  return (
    <div className="space-y-8">
      {!showCertificate ? (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="internName">Intern Name</Label>
                  <Input 
                    id="internName"
                    name="internName"
                    value={formData.internName}
                    onChange={handleChange}
                    placeholder="Enter intern name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="internshipProgram">Internship Program</Label>
                  <Input 
                    id="internshipProgram"
                    name="internshipProgram"
                    value={formData.internshipProgram}
                    onChange={handleChange}
                    placeholder="Enter internship program name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="completionDate">Completion Date</Label>
                  <Input 
                    id="completionDate"
                    name="completionDate"
                    type="date"
                    value={formData.completionDate}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certificateId">Certificate ID</Label>
                  <Input 
                    id="certificateId"
                    name="certificateId"
                    value={formData.certificateId}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">Generate Certificate</Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end space-x-2 print:hidden">
            <Button variant="outline" onClick={() => setShowCertificate(false)}>
              Edit
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          
          <div className="print:m-0">
            <Certificate 
              internName={formData.internName}
              internshipProgram={formData.internshipProgram}
              completionDate={new Date(formData.completionDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              certificateId={formData.certificateId}
              companyName="Tech Instance"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGenerator;
