
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CertificatePerformanceDetailsProps {
  score: string;
  totalCandidates: string;
  assignments: string;
  exam: string;
  onFieldChange: (name: string, value: string) => void;
}

const CertificatePerformanceDetails: React.FC<CertificatePerformanceDetailsProps> = ({
  score,
  totalCandidates,
  assignments,
  exam,
  onFieldChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFieldChange(name, value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Performance Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="score" className="block mb-2">Overall Score (%)</Label>
          <Input
            id="score"
            name="score"
            type="text"
            value={score}
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
            value={totalCandidates}
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
            value={assignments}
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
            value={exam}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CertificatePerformanceDetails;
