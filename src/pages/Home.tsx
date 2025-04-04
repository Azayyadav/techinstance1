
import { Link } from "react-router-dom";
import { ArrowRight, Settings, Cloud, Code, Database, Server, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-it-gray-light to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Delivering <span className="gradient-text">Innovative</span> IT Solutions
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                We help businesses transform through technology with our comprehensive IT services and solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-it-blue-dark hover:bg-it-blue text-white px-6 py-6 rounded-md">
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-it-blue-dark text-it-blue-dark hover:bg-it-blue-dark hover:text-white px-6 py-6 rounded-md">
                  <Link to="/services">
                    Our Services
                  </Link>
                </Button>
              </div>
            </div>
            <div className="animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Digital Transformation" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-xl text-gray-600 font-medium">Trusted by leading companies worldwide</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {/* Replace with actual partner logos */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="h-12 w-32 bg-gray-300 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding angled-bg">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our IT Solutions</h2>
            <p className="text-lg text-gray-600">
              Delivering end-to-end IT services and solutions to help businesses innovate and thrive in the digital era.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "App Development",
                description: "Custom application development using the latest technologies and frameworks.",
                icon: Code,
                link: "/services/app-development"
              },
              { 
                title: "Cloud Services",
                description: "Secure, scalable and reliable cloud solutions for modern businesses.",
                icon: Cloud,
                link: "/services/cloud"
              },
              { 
                title: "AI & Machine Learning",
                description: "Intelligent solutions that leverage data to drive business decisions.",
                icon: Cpu,
                link: "/services/ai"
              },
              { 
                title: "IT Consulting",
                description: "Strategic technology consulting to align IT with business objectives.",
                icon: Settings,
                link: "/services/consulting"
              },
              { 
                title: "Database Management",
                description: "Comprehensive database solutions for optimal data handling.",
                icon: Database,
                link: "/services/database"
              },
              { 
                title: "Infrastructure Services",
                description: "Robust IT infrastructure services that ensure operational excellence.",
                icon: Server,
                link: "/services/infrastructure"
              }
            ].map((service, index) => (
              <Card key={index} className="service-card border border-gray-200 overflow-hidden">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-it-blue bg-opacity-10 flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-it-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    to={service.link} 
                    className="text-it-blue font-medium inline-flex items-center group"
                  >
                    Learn More 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Our Team" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose TechNex?</h2>
              <p className="text-lg text-gray-600 mb-8">
                With over two decades of experience delivering IT excellence, we combine deep industry knowledge with technical expertise to deliver solutions that drive business outcomes.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Industry Expertise",
                    description: "Specialized knowledge across multiple sectors including finance, healthcare, and retail."
                  },
                  {
                    title: "Technical Excellence",
                    description: "Cutting-edge technologies and methodologies to deliver outstanding results."
                  },
                  {
                    title: "Client-Focused Approach",
                    description: "Tailored solutions designed around your specific business needs and goals."
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
              
              <div className="mt-8">
                <Button asChild className="bg-it-blue hover:bg-it-blue-dark text-white px-6 py-6 rounded-md">
                  <Link to="/about">
                    More About Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-it-blue-dark text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Partner with TechNex to drive innovation, enhance operational efficiency, and achieve your business goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-white text-it-blue-dark hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-md">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-md">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
