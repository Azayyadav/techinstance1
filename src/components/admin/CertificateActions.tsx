
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2, FileText, QrCode, Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

      const canvas = await html2canvas(certificateElement as HTMLElement, {
        scale: 3,
        useCORS: true,
        logging: false
      });
      
      const imgWidth = 297;
      const imgHeight = 210;
      
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
      const imgX = (pdfWidth - canvas.width * ratio) / 2;
      const imgY = (pdfHeight - canvas.height * ratio) / 2;
      
      pdf.addImage(
        canvas.toDataURL('image/png'), 
        'PNG', 
        imgX, 
        imgY, 
        canvas.width * ratio, 
        canvas.height * ratio
      );
      
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
    // Use current domain until custom domain is set up
    const verificationUrl = `${window.location.origin}/verify?id=${encodeURIComponent(certificateId)}`;
    
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
  
  const handleShareToSocial = (platform: string) => {
    // Use current domain until custom domain is set up
    const verificationUrl = `${window.location.origin}/verify?id=${encodeURIComponent(certificateId)}`;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(verificationUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verificationUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(verificationUrl)}&text=${encodeURIComponent('Check out my certificate from Tech Instance!')}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('My Tech Instance Certificate')}&body=${encodeURIComponent(`Check out my verified certificate: ${verificationUrl}`)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-wrap justify-end gap-2 print:hidden mb-4">
      <Button variant="outline" onClick={onEdit} className="hover:bg-blue-50">
        <FileText className="mr-2 h-4 w-4" />
        Edit
      </Button>
      <Button variant="outline" onClick={onPrint} className="hover:bg-blue-50">
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      <Button variant="outline" onClick={handleDownloadPDF} className="hover:bg-blue-50">
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <Button variant="outline" onClick={handleCopyVerificationURL} className="hover:bg-blue-50">
        <QrCode className="mr-2 h-4 w-4" />
        Copy Verification Link
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="hover:bg-blue-50">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShareToSocial('facebook')}>
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShareToSocial('linkedin')}>
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShareToSocial('twitter')}>
            <Instagram className="mr-2 h-4 w-4" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShareToSocial('email')}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CertificateActions;
