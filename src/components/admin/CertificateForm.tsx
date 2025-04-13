
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CertificateFormData {
  internName: string;
  internshipProgram: string;
  startDate: string;
  endDate: string;
  certificateId: string;
  companyName: string;
  duration: string;
  signatoryName: string;
  signatoryPosition: string;
  description: string;
}

interface CertificateFormProps {
  formData: CertificateFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isEditMode?: boolean;
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleSubmit,
  isEditMode = false
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="internName">Intern Name *</Label>
              <Input 
                id="internName"
                name="internName"
                value={formData.internName}
                onChange={handleChange}
                placeholder="Enter intern name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="internshipProgram">Internship Program *</Label>
              <Input 
                id="internshipProgram"
                name="internshipProgram"
                value={formData.internshipProgram}
                onChange={handleChange}
                placeholder="e.g. React Native & App-write"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input 
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input 
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("duration", value)}
                value={formData.duration}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-month internship">1-month internship</SelectItem>
                  <SelectItem value="2-month internship">2-month internship</SelectItem>
                  <SelectItem value="3-month internship">3-month internship</SelectItem>
                  <SelectItem value="6-month internship">6-month internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="certificateId">Certificate ID</Label>
              <Input 
                id="certificateId"
                name="certificateId"
                value={formData.certificateId}
                onChange={handleChange}
                disabled={true}
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signatoryName">Signatory Name</Label>
              <Input 
                id="signatoryName"
                name="signatoryName"
                value={formData.signatoryName}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signatoryPosition">Signatory Position</Label>
              <Input 
                id="signatoryPosition"
                name="signatoryPosition"
                value={formData.signatoryPosition}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Additional Notes (Optional)</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add any additional notes or comments"
                rows={3}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            {isEditMode ? "Update Certificate" : "Generate Certificate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CertificateForm;
