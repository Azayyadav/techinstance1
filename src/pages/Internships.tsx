
import React, { useState } from "react";
import { ArrowRight, MapPin, Briefcase, Clock, DollarSign, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { mockJobListings } from "@/data/mockData";

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { toast } = useToast();
  
  // Filter only internship positions from the mock data
  const internships = mockJobListings.filter(job => job.type === "Internship");
  
  const filteredInternships = internships.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "" || job.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });
  
  const handleApplyNow = (jobTitle: string) => {
    toast({
      title: "Application Started",
      description: `You've started an application for ${jobTitle}. Please check your email to complete the process.`,
    });
  };

  const departments = [...new Set(internships.map(job => job.department))];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-it-gray-light to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Internship Opportunities</h1>
            <p className="text-xl text-gray-600">
              Start your career with Tech Instance. Gain hands-on experience and mentorship from industry experts.
            </p>
          </div>
        </div>
      </section>

      {/* Internship Program Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our Internship Program</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Tech Instance, we believe in nurturing the next generation of tech talent. Our internship program is designed to provide valuable industry experience, mentorship, and opportunities for growth.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Real-World Projects",
                    description: "Work on actual projects that impact our business and clients."
                  },
                  {
                    title: "Mentorship",
                    description: "Learn from experienced professionals who are passionate about sharing their knowledge."
                  },
                  {
                    title: "Career Development",
                    description: "Workshops, training, and networking opportunities to help you grow."
                  },
                  {
                    title: "Competitive Compensation",
                    description: "We offer competitive pay and benefits for all our interns."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">
                      <div className="w-6 h-6 rounded-full bg-it-blue flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Interns Collaborating" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Available Internships */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Available Internship Positions</h2>
            <p className="text-lg text-gray-600">
              Explore our current internship opportunities and find a position that aligns with your skills and interests.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search" className="mb-2 block">Search</Label>
                <Input 
                  id="search"
                  type="text"
                  placeholder="Search by title or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="department" className="mb-2 block">Department</Label>
                <select 
                  id="department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-it-blue"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Internship Listings */}
          <div className="space-y-6">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <Card key={internship.id} className="border border-gray-200 hover:border-it-blue transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{internship.title}</h3>
                        <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{internship.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{internship.type}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{internship.salary}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Posted {internship.postedDate}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6">{internship.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <Button 
                          className="bg-it-blue hover:bg-it-blue-dark text-white"
                          onClick={() => handleApplyNow(internship.title)}
                        >
                          Apply Now
                          <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No internships match your search criteria. Try adjusting your filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDepartment("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Application Process</h2>
            <p className="text-lg text-gray-600">
              Our internship application process is designed to be straightforward and transparent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Submit Application",
                description: "Complete your application with resume and cover letter"
              },
              {
                step: "2",
                title: "Initial Review",
                description: "Our team reviews your application and qualifications"
              },
              {
                step: "3",
                title: "Interview",
                description: "Selected candidates are invited for an interview"
              },
              {
                step: "4",
                title: "Decision",
                description: "Final decision and offer to selected candidates"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-it-blue-light text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our internship program.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Are internships paid or unpaid?",
                answer: "All internships at Tech Instance are paid positions with competitive compensation."
              },
              {
                question: "What is the typical duration of an internship?",
                answer: "Our internships typically last 3-6 months, depending on the position and project requirements."
              },
              {
                question: "Do you offer internships to international students?",
                answer: "Yes, we welcome international students who have the legal right to work in the country where the internship is located."
              },
              {
                question: "Is there a possibility of full-time employment after the internship?",
                answer: "Yes, outstanding interns may be considered for full-time positions upon completion of their internship, based on performance and business needs."
              },
              {
                question: "What qualifications do you look for in interns?",
                answer: "We look for candidates who demonstrate passion, initiative, relevant skills, and a willingness to learn and grow."
              },
              {
                question: "Are internships remote or on-site?",
                answer: "We offer both remote and on-site internships, depending on the position and team needs."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact For More Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Have More Questions?</h2>
            <p className="text-lg text-gray-600 mb-8">
              If you have any questions or need more information about our internship program, feel free to contact us.
            </p>
            <Button asChild className="bg-it-blue hover:bg-it-blue-dark text-white">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internships;
