
export interface Certificate {
  id: string;
  internName: string;
  internshipProgram: string;
  startDate: string;
  endDate: string;
  companyName: string;
  duration: string;
  issueDate: string;
  status: "Active" | "Revoked";
}

// Mock data for certificates - in a real application, this would be stored in a database
export const certificates: Certificate[] = [
  {
    id: "TECH-XYZ1234",
    internName: "Jane Doe",
    internshipProgram: "Full Stack Development",
    startDate: "2024-01-15",
    endDate: "2024-03-15", 
    companyName: "Tech Instance",
    duration: "2-month",
    issueDate: "2024-03-15",
    status: "Active"
  },
  {
    id: "TECH-ABC5678",
    internName: "John Smith",
    internshipProgram: "UI/UX Design",
    startDate: "2023-12-20",
    endDate: "2024-02-20",
    companyName: "Tech Instance",
    duration: "2-month",
    issueDate: "2024-02-20",
    status: "Active"
  },
  {
    id: "TECH-DEF9012",
    internName: "Emily Johnson",
    internshipProgram: "Data Science",
    startDate: "2023-11-10",
    endDate: "2024-01-10",
    companyName: "Tech Instance",
    duration: "2-month",
    issueDate: "2024-01-10",
    status: "Active"
  },
  {
    id: "TECH-EJXZFAD",
    internName: "Alex Parker",
    internshipProgram: "Web Development",
    startDate: "2023-12-01",
    endDate: "2024-02-01",
    companyName: "Tech Instance",
    duration: "2-month",
    issueDate: "2024-02-01",
    status: "Active"
  }
];

// Function to verify a certificate by ID
export const verifyCertificate = (id: string): Certificate | null => {
  return certificates.find(cert => cert.id === id) || null;
};

// Function to add a new certificate
export const addCertificate = (certificate: Certificate): Certificate => {
  certificates.push(certificate);
  return certificate;
};
