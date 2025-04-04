
import { Link } from "react-router-dom";
import { ArrowRight, Building, Users, ShoppingBag, Truck, Wrench, Leaf, BookOpen, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Industries = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-it-gray-light to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Industries We Serve</h1>
            <p className="text-xl text-gray-600">
              Delivering specialized IT solutions across diverse industries to address unique challenges and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Overview */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Banking & Finance",
                description: "Secure, compliant, and innovative solutions for the financial sector, from digital banking to advanced analytics.",
                icon: Building,
                link: "/industries/banking",
                solutions: ["Digital Banking Platforms", "Fraud Detection Systems", "Regulatory Compliance", "Financial Analytics"]
              },
              { 
                title: "Healthcare",
                description: "Technology solutions to enhance patient care, optimize operations, and ensure data security and compliance.",
                icon: Users,
                link: "/industries/healthcare",
                solutions: ["Electronic Health Records", "Telemedicine Platforms", "Healthcare Analytics", "Medical Device Integration"]
              },
              { 
                title: "Retail & E-commerce",
                description: "Omnichannel solutions to enhance customer experience, optimize inventory, and drive sales growth.",
                icon: ShoppingBag,
                link: "/industries/retail",
                solutions: ["E-commerce Platforms", "Customer Experience", "Inventory Management", "Retail Analytics"]
              },
              { 
                title: "Manufacturing",
                description: "Smart manufacturing solutions to improve operational efficiency, product quality, and supply chain management.",
                icon: Wrench,
                link: "/industries/manufacturing",
                solutions: ["IoT & Automation", "Supply Chain Optimization", "Predictive Maintenance", "Quality Control Systems"]
              },
              { 
                title: "Logistics & Transportation",
                description: "Digital solutions to optimize routes, enhance tracking, and improve overall logistics operations.",
                icon: Truck,
                link: "/industries/logistics",
                solutions: ["Fleet Management", "Route Optimization", "Warehouse Automation", "Logistics Analytics"]
              },
              { 
                title: "Energy & Utilities",
                description: "Smart grid solutions, energy management systems, and digital transformation for the utilities sector.",
                icon: Leaf,
                link: "/industries/energy",
                solutions: ["Smart Grid Solutions", "Energy Management", "IoT for Utilities", "Renewable Energy Systems"]
              },
              { 
                title: "Education",
                description: "Digital learning solutions, campus management systems, and data analytics for educational institutions.",
                icon: BookOpen,
                link: "/industries/education",
                solutions: ["Learning Management Systems", "Student Information Systems", "Campus Networks", "Education Analytics"]
              },
              { 
                title: "Legal & Professional Services",
                description: "Specialized solutions for law firms and professional service organizations to enhance client service and operations.",
                icon: Scale,
                link: "/industries/legal",
                solutions: ["Case Management Systems", "Document Management", "Client Portals", "Billing & Time Tracking"]
              }
            ].map((industry, index) => (
              <Card key={index} className="service-card border border-gray-200 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-full bg-it-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <industry.icon className="h-7 w-7 text-it-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{industry.title}</h3>
                  <p className="text-gray-600 mb-6">{industry.description}</p>
                  
                  <div className="mt-auto">
                    <h4 className="font-medium mb-3">Key Solutions:</h4>
                    <ul className="mb-6 space-y-2">
                      {industry.solutions.map((solution, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-it-blue-light mr-2"></div>
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to={industry.link} 
                      className="text-it-blue font-medium inline-flex items-center group"
                    >
                      Learn More 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Industry Expertise</h2>
              <p className="text-lg text-gray-600 mb-4">
                With decades of experience across multiple sectors, we combine deep industry knowledge with technical expertise to deliver solutions that address the unique challenges and opportunities in each industry.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our industry specialists work closely with clients to understand their business context, regulatory requirements, and competitive landscape, ensuring our solutions drive meaningful business outcomes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-it-blue flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Industry-Specific Teams</h3>
                    <p className="text-gray-600">Dedicated teams with deep domain expertise</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-it-blue flex items-center justify-center mr-4">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Best Practices & Standards</h3>
                    <p className="text-gray-600">Solutions aligned with industry standards</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-it-blue flex items-center justify-center mr-4">
                    <Scale className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Regulatory Compliance</h3>
                    <p className="text-gray-600">Ensuring solutions meet regulatory requirements</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Industry Expertise" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
            <p className="text-lg text-gray-600">
              Discover how we've helped clients across different industries transform their businesses with technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Transformation for a Global Bank",
                industry: "Banking & Finance",
                description: "Modernized core banking systems resulting in 40% improved operational efficiency and enhanced customer experience."
              },
              {
                title: "Telemedicine Platform for Healthcare Provider",
                industry: "Healthcare",
                description: "Built a secure telemedicine platform enabling remote consultations for over 500,000 patients annually."
              },
              {
                title: "IoT Solution for Manufacturing Company",
                industry: "Manufacturing",
                description: "Implemented IoT sensors and predictive maintenance, reducing downtime by 35% and maintenance costs by 28%."
              }
            ].map((story, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-it-blue mb-2">{story.industry}</div>
                  <h3 className="text-xl font-semibold mb-3">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.description}</p>
                  <Link 
                    to="/case-studies" 
                    className="text-it-blue font-medium inline-flex items-center group"
                  >
                    Read Case Study 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="bg-it-blue hover:bg-it-blue-dark text-white px-6 py-6 rounded-md">
              <Link to="/case-studies">View All Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-it-blue text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Transform Your Industry</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Partner with us to leverage our industry expertise and innovative technology solutions to address your unique challenges.
          </p>
          <Button asChild className="bg-white text-it-blue hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-md">
            <Link to="/contact">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Industries;
