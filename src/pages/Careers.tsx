
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, MapPin, Briefcase, Clock, DollarSign, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const jobListings = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    department: "Engineering",
    salary: "$120K - $150K",
    postedDate: "2 days ago",
    description: "We are looking for a skilled Senior Full Stack Developer to join our growing engineering team. You will be responsible for developing and maintaining web applications using modern technologies."
  },
  {
    id: 2,
    title: "UX/UI Designer",
    location: "Remote",
    type: "Full-time",
    department: "Design",
    salary: "$90K - $120K",
    postedDate: "1 week ago",
    description: "Join our design team to create intuitive and engaging user experiences for our clients' digital products. You will work closely with product managers and developers to bring designs to life."
  },
  {
    id: 3,
    title: "DevOps Engineer",
    location: "New York, NY",
    type: "Full-time",
    department: "Operations",
    salary: "$110K - $140K",
    postedDate: "3 days ago",
    description: "We're seeking an experienced DevOps Engineer to help build and maintain our cloud infrastructure and deployment pipelines. Experience with AWS, Docker, and CI/CD is required."
  },
  {
    id: 4,
    title: "Data Scientist",
    location: "Boston, MA",
    type: "Full-time",
    department: "Data",
    salary: "$115K - $145K",
    postedDate: "5 days ago",
    description: "Join our data science team to develop and implement machine learning models and algorithms. You will work with large datasets to extract insights and drive business decisions."
  },
  {
    id: 5,
    title: "Project Manager",
    location: "Chicago, IL",
    type: "Full-time",
    department: "Project Management",
    salary: "$95K - $125K",
    postedDate: "2 weeks ago",
    description: "We are looking for an experienced Project Manager to lead IT projects from conception to completion. You will work with clients and internal teams to ensure timely delivery and high-quality results."
  },
  {
    id: 6,
    title: "Quality Assurance Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Quality Assurance",
    salary: "$85K - $110K",
    postedDate: "1 week ago",
    description: "Join our QA team to ensure the quality of our software products. You will design and implement test plans, automated tests, and collaborate with developers to identify and fix issues."
  }
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLocationType, setSelectedLocationType] = useState("");
  const { toast } = useToast();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  const handleLocationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocationType(e.target.value);
  };

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "" || job.department === selectedDepartment;
    
    const matchesLocationType = selectedLocationType === "" || 
                               (selectedLocationType === "Remote" && job.location === "Remote") ||
                               (selectedLocationType === "On-site" && job.location !== "Remote");
    
    return matchesSearch && matchesDepartment && matchesLocationType;
  });

  const handleApplyNow = (jobTitle: string) => {
    toast({
      title: "Application Started",
      description: `You've started an application for ${jobTitle}. Please check your email to complete the process.`,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-it-gray-light to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-600">
              Be part of a team that's transforming businesses through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Join TechNex?</h2>
              <p className="text-lg text-gray-600 mb-6">
                At TechNex, we believe that our people are our greatest asset. We're committed to creating a workplace where talented individuals can grow, innovate, and make a real impact.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Innovation at Scale",
                    description: "Work on cutting-edge projects using the latest technologies to solve complex business challenges."
                  },
                  {
                    title: "Growth & Development",
                    description: "Continuous learning opportunities, mentorship programs, and clear career progression paths."
                  },
                  {
                    title: "Work-Life Balance",
                    description: "Flexible work arrangements, generous time off, and a focus on wellbeing."
                  },
                  {
                    title: "Inclusive Culture",
                    description: "A diverse and inclusive environment where everyone's voice is heard and valued."
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
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Team Collaboration" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Benefits & Perks</h2>
            <p className="text-lg text-gray-600">
              We offer a comprehensive benefits package to support your health, wealth, and work-life balance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Health & Wellness",
                benefits: ["Comprehensive health insurance", "Dental and vision coverage", "Mental health support", "Wellness programs"]
              },
              {
                title: "Financial Benefits",
                benefits: ["Competitive compensation", "Retirement plans with matching", "Stock options", "Performance bonuses"]
              },
              {
                title: "Time Off",
                benefits: ["Generous PTO", "Paid holidays", "Parental leave", "Volunteer time off"]
              },
              {
                title: "Lifestyle & More",
                benefits: ["Flexible work arrangements", "Professional development", "Team events", "Office perks"]
              }
            ].map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-it-blue-light mr-2"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Current Openings</h2>
            <p className="text-lg text-gray-600">
              Explore our current job opportunities and find a role that matches your skills and career goals.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search" className="mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input 
                    id="search"
                    type="text"
                    placeholder="Search by title or keyword"
                    className="pl-10"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="department" className="mb-2 block">Department</Label>
                <select 
                  id="department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-it-blue"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Operations">Operations</option>
                  <option value="Data">Data</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="locationType" className="mb-2 block">Location Type</Label>
                <select 
                  id="locationType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-it-blue"
                  value={selectedLocationType}
                  onChange={handleLocationTypeChange}
                >
                  <option value="">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <Card key={job.id} className="border border-gray-200 hover:border-it-blue transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Posted {job.postedDate}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6">{job.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <Button 
                          className="bg-it-blue hover:bg-it-blue-dark text-white"
                          onClick={() => handleApplyNow(job.title)}
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
                <p className="text-xl text-gray-500">No jobs match your search criteria. Try adjusting your filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedDepartment("");
                    setSelectedLocationType("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Don't See a Job? */}
          <div className="bg-it-gray-light rounded-lg p-8 mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't See a Perfect Match?</h3>
            <p className="text-lg text-gray-600 mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button asChild className="bg-it-blue hover:bg-it-blue-dark text-white">
              <Link to="/contact">
                Submit Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-16 bg-it-blue-dark text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Life at TechNex</h2>
            <p className="text-xl text-blue-100">
              Hear from our team members about their experience working at TechNex.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Senior Developer",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                quote: "Working at TechNex has been the highlight of my career. The challenging projects, supportive team, and opportunities for growth have helped me develop both professionally and personally."
              },
              {
                name: "Michael Chen",
                role: "UX Designer",
                image: "https://randomuser.me/api/portraits/men/67.jpg",
                quote: "I love the collaborative culture at TechNex. I get to work with talented people across different disciplines, and my ideas are always valued and considered."
              },
              {
                name: "Emily Rodriguez",
                role: "Project Manager",
                image: "https://randomuser.me/api/portraits/women/28.jpg",
                quote: "The work-life balance at TechNex is exceptional. The flexible work arrangements allow me to be productive while also taking care of my family and personal commitments."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-blue-200">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-blue-100">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
