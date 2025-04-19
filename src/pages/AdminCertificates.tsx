
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Award, Search, Eye, Download, Trash2, Edit, Check, X } from "lucide-react";
import CertificateGenerator from "@/components/admin/CertificateGenerator";
import { 
  certificates, 
  Certificate, 
  deleteCertificate, 
  toggleCertificateStatus 
} from "@/data/certificatesData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

const AdminCertificates = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "create" | "edit">("list");
  const [certificatesList, setCertificatesList] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Remove duplicate certificates from the list
  const removeDuplicates = (certs: Certificate[]): Certificate[] => {
    const uniqueIds = new Set<string>();
    return certs.filter(cert => {
      if (uniqueIds.has(cert.id)) {
        return false;
      }
      uniqueIds.add(cert.id);
      return true;
    });
  };

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
      // Remove duplicate certificates before setting the list
      setCertificatesList(removeDuplicates(certificates));
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

  const handleViewCertificate = (id: string) => {
    navigate(`/verify?id=${encodeURIComponent(id)}`);
  };

  const handleDownloadCertificate = (id: string) => {
    toast({
      title: "Download initiated",
      description: "Certificate download started",
    });
  };
  
  const handleEditCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setActiveTab("edit");
  };

  const handleDeleteClick = (id: string) => {
    setCertificateToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (certificateToDelete) {
      const success = deleteCertificate(certificateToDelete);
      
      if (success) {
        setCertificatesList(prev => prev.filter(cert => cert.id !== certificateToDelete));
        
        toast({
          title: "Certificate deleted",
          description: "The certificate has been permanently removed",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not delete the certificate. Please try again.",
        });
      }
      
      setDeleteDialogOpen(false);
      setCertificateToDelete(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    const updatedCertificate = toggleCertificateStatus(id);
    
    if (updatedCertificate) {
      setCertificatesList(prev => 
        prev.map(cert => cert.id === id ? updatedCertificate : cert)
      );
      
      toast({
        title: `Certificate ${updatedCertificate.status === "Active" ? "Activated" : "Revoked"}`,
        description: `The certificate is now ${updatedCertificate.status.toLowerCase()}`,
      });
    }
  };

  const filteredCertificates = certificatesList.filter(cert => 
    cert.internName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cert.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onCertificateGenerated = (newCertificate: Certificate) => {
    // Add new certificate without duplicates
    setCertificatesList(prev => {
      // First remove any existing certificate with the same ID
      const filtered = prev.filter(cert => cert.id !== newCertificate.id);
      // Then add the new certificate
      return [...filtered, newCertificate];
    });
    
    toast({
      title: "Certificate Generated",
      description: `Certificate for ${newCertificate.internName} has been created successfully.`,
    });
    setActiveTab("list");
  };
  
  const onCertificateUpdated = (updatedCertificate: Certificate) => {
    setCertificatesList(prev => 
      prev.map(cert => cert.id === updatedCertificate.id ? updatedCertificate : cert)
    );
    toast({
      title: "Certificate Updated",
      description: `Certificate for ${updatedCertificate.internName} has been updated successfully.`,
    });
    setActiveTab("list");
    setSelectedCertificate(null);
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold">Certificate Management</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button 
            variant={activeTab === "list" ? "default" : "outline"} 
            onClick={() => {
              setActiveTab("list");
              setSelectedCertificate(null);
            }}
          >
            Certificate List
          </Button>
          <Button 
            variant={activeTab === "create" ? "default" : "outline"} 
            onClick={() => {
              setActiveTab("create");
              setSelectedCertificate(null);
            }}
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
                        <TableRow key={`${cert.id}-${cert.internName}`}>
                          <TableCell className="font-medium">{cert.id}</TableCell>
                          <TableCell>{cert.internName}</TableCell>
                          <TableCell>{cert.internshipProgram}</TableCell>
                          <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={cert.status === "Active" ? "success" : "destructive"} className="cursor-pointer" onClick={() => handleToggleStatus(cert.id)}>
                              {cert.status === "Active" ? (
                                <Check className="h-3 w-3 mr-1" />
                              ) : (
                                <X className="h-3 w-3 mr-1" />
                              )}
                              {cert.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewCertificate(cert.id)}
                                title="View Certificate"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDownloadCertificate(cert.id)}
                                title="Download Certificate"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditCertificate(cert)}
                                title="Edit Certificate"
                              >
                                <Edit className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteClick(cert.id)}
                                title="Delete Certificate"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
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
        ) : activeTab === "create" ? (
          <CertificateGenerator onCertificateGenerated={onCertificateGenerated} />
        ) : (
          <CertificateGenerator 
            onCertificateGenerated={onCertificateUpdated} 
            existingCertificate={selectedCertificate} 
            isEditMode={true}
          />
        )}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the certificate and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminCertificates;
