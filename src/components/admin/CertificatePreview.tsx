
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Certificate from "./Certificate";

interface CertificatePreviewProps {
  formData: {
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
    customDescription: string;
  };
  signatureImage?: string;
  companyLogo?: string;
  internImage?: string;
  formatDate: (date: string) => string;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  formData,
  signatureImage,
  companyLogo,
  internImage,
  formatDate
}) => {
  const [previewOpen, setPreviewOpen] = React.useState(false);

  return (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Preview Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl shadow-lg">
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
            customDescription={formData.customDescription}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;
