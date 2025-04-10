
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Award, Search, Eye, Download } from "lucide-react";
import CertificateGenerator from "@/components/admin/CertificateGenerator";

// Mock data for certificates
const mockCertificates = [
  {
    id: "TECH-XYZ1234",
    internName: "Jane Doe",
    program: "Full Stack Development",
    issueDate: "2024-03-15",
    status: "Active"
  },
  {
    id: "TECH-ABC5678",
    internName: "John Smith",
    program: "UI/UX Design",
    issueDate: "2024-02-20",
    status: "Active"
  },
  {
    id: "TECH-DEF9012",
    internName: "Emily Johnson",
    program: "Data Science",
    issueDate: "2024-01-10",
    status: "Active"
  }
];

const AdminCertificates = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const [certificates, setCertificates] = useState(mockCertificates);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/admin");
  };

  const filteredCertificates = certificates.filter(cert => 
    cert.internName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cert.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-it-blue mr-3" />
            <h1 className="text-3xl font-bold">Certificate Management</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button 
            variant={activeTab === "list" ? "default" : "outline"} 
            onClick={() => setActiveTab("list")}
          >
            Certificate List
          </Button>
          <Button 
            variant={activeTab === "create" ? "default" : "outline"} 
            onClick={() => setActiveTab("create")}
          >
            Create Certificate
          </Button>
        </div>

        {activeTab === "list" ? (
          <div className="space-y-6">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search certificates by ID or intern name..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>All Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate ID</TableHead>
                      <TableHead>Intern Name</TableHead>
                      <TableHead>Program</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertificates.length > 0 ? (
                      filteredCertificates.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.id}</TableCell>
                          <TableCell>{cert.internName}</TableCell>
                          <TableCell>{cert.program}</TableCell>
                          <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {cert.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                          No certificates found. Try adjusting your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ) : (
          <CertificateGenerator />
        )}
      </div>
    </div>
  );
};

export default AdminCertificates;
