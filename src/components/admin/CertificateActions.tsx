
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Download, Share2 } from "lucide-react";

interface CertificateActionsProps {
  onEdit: () => void;
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const CertificateActions: React.FC<CertificateActionsProps> = ({
  onEdit,
  onPrint,
  onDownload,
  onShare
}) => {
  return (
    <div className="flex justify-end space-x-2 print:hidden">
      <Button variant="outline" onClick={onEdit}>
        Edit
      </Button>
      <Button variant="outline" onClick={onPrint}>
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      <Button variant="outline" onClick={onDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="outline" onClick={onShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default CertificateActions;
