
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateImageUploadProps {
  title: string;
  id: string;
  description: string;
  currentImage?: string;
  onImageUpload: (image: string) => void;
}

const CertificateImageUpload: React.FC<CertificateImageUploadProps> = ({
  title,
  id,
  description,
  currentImage,
  onImageUpload
}) => {
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          onImageUpload(event.target.result);
          toast({
            title: `${title} uploaded`,
            description: `${title} has been successfully uploaded.`
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Upload {title}</h3>
      <div className="flex items-center gap-4">
        <div className="w-full">
          <Label htmlFor={id} className="block mb-2">Choose {title.toLowerCase()}</Label>
          <div className="flex items-center gap-3">
            <input
              id={id}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button 
              type="button" 
              variant="outline"
              onClick={() => document.getElementById(id)?.click()}
              className="w-1/3"
            >
              <Upload className="mr-2 h-4 w-4" />
              Select File
            </Button>
            
            <div className={`border rounded-md h-24 ${id === 'intern-photo-upload' ? 'w-24' : id === 'signature-upload' ? 'w-36' : 'w-24'} flex items-center justify-center bg-gray-50`}>
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt={`${title} Preview`} 
                  className={`${id === 'intern-photo-upload' ? 'max-h-30 max-w-22 object-cover' : 'max-h-20 max-w-full object-contain'}`}
                />
              ) : (
                <p className="text-xs text-gray-400">No {title.toLowerCase()}</p>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateImageUpload;
