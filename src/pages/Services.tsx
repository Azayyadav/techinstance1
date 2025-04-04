
import { Link } from "react-router-dom";
import { ArrowRight, Code, Cloud, Database, Server, Cpu, PenTool, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-it-gray-light to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-600">
              Comprehensive IT solutions designed to help your business transform, innovate, and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Application Development",
                description: "Custom application development services tailored to your business needs using the latest technologies and methodologies.",
                icon: Code,
                link: "/services/app-development",
                features: ["Custom Web Applications", "Mobile App Development", "UI/UX Design", "API Development"]
              },
              { 
                title: "Cloud Services",
                description: "Comprehensive cloud solutions to help you migrate, optimize, and innovate in the cloud environment.",
                icon: Cloud,
                link: "/services/cloud",
                features: ["Cloud Migration", "Cloud Infrastructure", "Cloud-Native Development", "DevOps"]
              },
              { 
                title: "AI & Machine Learning",
                description: "Advanced AI and machine learning solutions to unlock insights from your data and automate processes.",
                icon: Cpu,
                link: "/services/ai",
                features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "AI Strategy"]
              },
              { 
                title: "IT Consulting",
                description: "Strategic technology consulting to align your IT investments with business objectives.",
                icon: PenTool,
                link: "/services/consulting",
                features: ["IT Strategy", "Digital Transformation", "Technology Assessment", "Process Optimization"]
              },
              { 
                title: "Database Management",
                description: "Comprehensive database solutions for efficient data storage, access, and analysis.",
                icon: Database,
                link: "/services/database",
                features: ["Database Design", "Performance Optimization", "Data Migration", "Database Security"]
              },
              { 
                title: "Infrastructure Services",
                description: "Robust IT infrastructure services ensuring performance, scalability, and security.",
                icon: Server,
                link: "/services/infrastructure",
                features: ["Network Design", "Server Management", "Virtualization", "IT Support"]
              },
              { 
                title: "Cybersecurity",
                description: "Advanced security solutions to protect your business from evolving cyber threats.",
                icon: Shield,
                link: "/services/security",
                features: ["Security Assessment", "Threat Detection", "Compliance", "Security Training"]
              },
              { 
                title: "Digital Transformation",
                description: "End-to-end digital transformation services to modernize your business processes and technology.",
                icon: Globe,
                link: "/services/digital-transformation",
                features: ["Digital Strategy", "Business Process Redesign", "Legacy Modernization", "Change Management"]
              }
            ].map((service, index) => (
              <Card key={index} className="service-card border border-gray-200 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-full bg-it-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-it-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="mt-auto">
                    <ul className="mb-6 space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-it-blue-light mr-2"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to={service.link} 
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

      {/* Our Approach */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
            <p className="text-lg text-gray-600">
              We follow a proven methodology to deliver solutions that meet your business needs and exceed your expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discover",
                description: "We start by understanding your business, challenges, and objectives."
              },
              {
                step: "02",
                title: "Design",
                description: "We design innovative solutions tailored to your specific requirements."
              },
              {
                step: "03",
                title: "Develop",
                description: "Our expert team brings the solutions to life with cutting-edge technology."
              },
              {
                step: "04",
                title: "Deliver",
                description: "We implement, test, and refine to ensure optimal performance and results."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full bg-it-blue-dark text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Technologies We Work With</h2>
            <p className="text-lg text-gray-600">
              Our team is proficient in a wide range of technologies to deliver the best solutions for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              "Frontend Development",
              "Backend Development",
              "Mobile Development",
              "Cloud Platforms",
              "Database Technologies",
              "DevOps Tools",
              "AI & ML Frameworks",
              "IoT Technologies",
              "CMS Platforms",
              "AR/VR Technologies",
              "Blockchain",
              "Big Data"
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="h-24 flex items-center justify-center bg-gray-100 rounded-lg mb-3">
                  <div className="w-12 h-12 bg-gray-300 animate-pulse rounded"></div>
                </div>
                <p className="text-sm font-medium">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-it-blue-dark text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Contact us today to discuss your project and discover how our services can help your business grow.
          </p>
          <Button asChild className="bg-white text-it-blue-dark hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-md">
            <Link to="/contact">
              Contact Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
