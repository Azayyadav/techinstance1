
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Users, Briefcase, PlusCircle, Award } from "lucide-react";
import { mockApplications, mockJobListings } from "@/data/mockData";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applications, setApplications] = useState(mockApplications);
  const [jobs, setJobs] = useState(mockJobListings);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }

    // In a real application, you would fetch data from your API here
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/admin");
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter(app => app.id !== id));
    toast({
      title: "Application deleted",
      description: "The application has been removed",
    });
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    toast({
      title: "Job listing deleted",
      description: "The job listing has been removed",
    });
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Job Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{jobs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Internship Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {applications.filter(app => app.jobType === "Internship").length}
              </div>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer bg-it-blue text-white hover:bg-it-blue-dark transition-colors"
            onClick={() => navigate("/admin/certificates")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Award className="mr-2 h-5 w-5" /> Certificate Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">Manage Intern Certificates</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">
              <Users className="mr-2 h-4 w-4" /> Applications
            </TabsTrigger>
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2 h-4 w-4" /> Job Listings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="mt-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Recent Job Applications</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {application.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {application.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${application.jobType === "Internship" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                            {application.jobType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {application.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {application.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteApplication(application.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <div className="flex justify-end mb-4">
              <Button onClick={() => navigate("/admin/add-job")}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Job Listing
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Active Job Listings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {job.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {job.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {job.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.type === "Internship" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                            {job.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {job.postedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
