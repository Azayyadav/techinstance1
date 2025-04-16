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
  score?: string;
  assignments?: string;
  exam?: string;
  totalCandidates?: string;
  internImage?: string;
  customDescription?: string;
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
    status: "Active",
    score: "85",
    assignments: "23/25",
    exam: "62/75",
    totalCandidates: "524",
    customDescription: "For successfully completing a 2-month internship from January 15, 2024 to March 15, 2024 in Full Stack Development at Tech Instance, Jane demonstrated strong dedication, technical skills, and valuable contributions to real-world projects."
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
    status: "Active",
    score: "78",
    assignments: "22/25",
    exam: "56/75",
    totalCandidates: "632",
    customDescription: "For successfully completing a 2-month internship from December 20, 2023 to February 20, 2024 in UI/UX Design at Tech Instance, John demonstrated strong dedication, technical skills, and valuable contributions to real-world projects."
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
    status: "Active",
    score: "92",
    assignments: "25/25",
    exam: "67/75",
    totalCandidates: "418",
    customDescription: "For successfully completing a 2-month internship from November 10, 2023 to January 10, 2024 in Data Science at Tech Instance, Emily demonstrated strong dedication, technical skills, and valuable contributions to real-world projects."
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
    status: "Active",
    score: "81",
    assignments: "21/25",
    exam: "60/75",
    totalCandidates: "587",
    customDescription: "For successfully completing a 2-month internship from December 1, 2023 to February 1, 2024 in Web Development at Tech Instance, Alex demonstrated strong dedication, technical skills, and valuable contributions to real-world projects."
  },
  {
    id: "TECH-3CMP7H1",
    internName: "cfg",
    internshipProgram: "g",
    startDate: "2024-03-16",
    endDate: "2024-04-16",
    companyName: "Tech Instance",
    duration: "1-month",
    issueDate: "2024-04-16",
    status: "Active",
    score: "75",
    assignments: "20/25",
    exam: "55/75",
    totalCandidates: "537",
    customDescription: "For successfully completing a 1-month internship in g at Tech Instance, cfg demonstrated strong dedication, technical skills, and valuable contributions to real-world projects."
  }
];

// Function to verify a certificate by ID
export const verifyCertificate = (id: string): Certificate | null => {
  // First, try to find the certificate with exact ID match
  const certificate = certificates.find(cert => cert.id === id);
  if (certificate) return certificate;
  
  // If not found, try to find by decoding the URL-encoded ID
  try {
    const decodedId = decodeURIComponent(id);
    return certificates.find(cert => cert.id === decodedId);
  } catch (e) {
    console.error("Error decoding certificate ID:", e);
    return null;
  }
};

// Function to add a new certificate
export const addCertificate = (certificate: Certificate): Certificate => {
  // Check if a certificate with this ID already exists
  const existingIndex = certificates.findIndex(cert => cert.id === certificate.id);
  
  if (existingIndex !== -1) {
    // Update existing certificate instead of adding a duplicate
    certificates[existingIndex] = certificate;
    return certificate;
  }
  
  // Otherwise add as new certificate
  certificates.push(certificate);
  return certificate;
};

// Function to delete a certificate by ID
export const deleteCertificate = (id: string): boolean => {
  const initialLength = certificates.length;
  const index = certificates.findIndex(cert => cert.id === id);
  
  if (index !== -1) {
    certificates.splice(index, 1);
    return initialLength > certificates.length;
  }
  
  return false;
};

// Function to update an existing certificate
export const updateCertificate = (id: string, updatedData: Partial<Certificate>): Certificate | null => {
  const index = certificates.findIndex(cert => cert.id === id);
  
  if (index !== -1) {
    certificates[index] = { ...certificates[index], ...updatedData };
    return certificates[index];
  }
  
  return null;
};

// Function to toggle certificate status (Active/Revoked)
export const toggleCertificateStatus = (id: string): Certificate | null => {
  const index = certificates.findIndex(cert => cert.id === id);
  
  if (index !== -1) {
    certificates[index].status = certificates[index].status === "Active" ? "Revoked" : "Active";
    return certificates[index];
  }
  
  return null;
};
