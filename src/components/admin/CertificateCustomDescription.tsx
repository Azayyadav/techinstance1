
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CertificateCustomDescriptionProps {
  customDescription: string;
  onDescriptionChange: (description: string) => void;
}

const CertificateCustomDescription: React.FC<CertificateCustomDescriptionProps> = ({
  customDescription,
  onDescriptionChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDescriptionChange(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Custom Certificate Description</h3>
      <div>
        <Label htmlFor="customDescription" className="block mb-2">Description Text</Label>
        <Textarea
          id="customDescription"
          name="customDescription"
          value={customDescription}
          onChange={handleChange}
          className="w-full min-h-[150px]"
          placeholder="Enter a custom description for the certificate..."
        />
        <p className="text-xs text-gray-500 mt-2">
          This text will be displayed prominently on the certificate. Include details about the internship experience.
        </p>
      </div>
    </div>
  );
};

export default CertificateCustomDescription;
