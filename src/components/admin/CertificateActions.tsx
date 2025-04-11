
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2, FileText, QrCode } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface CertificateActionsProps {
  onEdit: () => void;
  onPrint: () => void;
  onShare: () => void;
  certificateId: string;
}

const CertificateActions: React.FC<CertificateActionsProps> = ({
  onEdit,
  onPrint,
  onShare,
  certificateId
}) => {
  const { toast } = useToast();

  const handleDownloadPDF = async () => {
    toast({
      title: "Converting to PDF",
      description: "Please wait while we generate your PDF..."
    });

    try {
      const certificateElement = document.querySelector('.certificate-container');
      
      if (!certificateElement) {
        throw new Error("Certificate element not found");
      }

      // Use html2canvas to create an image of the certificate
      const canvas = await html2canvas(certificateElement as HTMLElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow loading of cross-origin images
        logging: false
      });
      
      // Calculate PDF dimensions (A4 format)
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save PDF
      pdf.save(`certificate-${certificateId}.pdf`);
      
      toast({
        title: "Success!",
        description: "Your certificate has been downloaded as a PDF.",
        variant: "default"
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCopyVerificationURL = () => {
    const baseUrl = window.location.origin;
    const verificationUrl = `${baseUrl}/verify?id=${certificateId}`;
    
    navigator.clipboard.writeText(verificationUrl).then(() => {
      toast({
        title: "Verification URL copied",
        description: "You can now share this link for certificate verification."
      });
    }).catch(err => {
      toast({
        title: "Failed to copy URL",
        description: "Please try again or copy manually.",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="flex flex-wrap justify-end gap-2 print:hidden mb-4">
      <Button variant="outline" onClick={onEdit}>
        <FileText className="mr-2 h-4 w-4" />
        Edit
      </Button>
      <Button variant="outline" onClick={onPrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      <Button variant="outline" onClick={handleDownloadPDF}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <Button variant="outline" onClick={handleCopyVerificationURL}>
        <QrCode className="mr-2 h-4 w-4" />
        Copy Verification Link
      </Button>
      <Button variant="outline" onClick={onShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default CertificateActions;
