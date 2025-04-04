import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Map, Briefcase, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-it-gray-light to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Tech Instance</h1>
            <p className="text-xl text-gray-600">
              A global IT services and consulting leader with a mission to drive digital transformation for enterprises worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2005, Tech Instance began as a small software development team with a vision to build innovative technology solutions. Today, we've grown into a global IT services company with offices in 12 countries and over 5,000 technology professionals.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our journey has been driven by a commitment to excellence, a passion for innovation, and a deep understanding of how technology can transform businesses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Award className="text-it-blue-dark h-6 w-6 mr-3" />
                  <span className="font-medium">15+ Years of Excellence</span>
                </div>
                <div className="flex items-center">
                  <Users className="text-it-blue-dark h-6 w-6 mr-3" />
                  <span className="font-medium">5,000+ Professionals</span>
                </div>
                <div className="flex items-center">
                  <Map className="text-it-blue-dark h-6 w-6 mr-3" />
                  <span className="font-medium">Global Presence</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="text-it-blue-dark h-6 w-6 mr-3" />
                  <span className="font-medium">1,000+ Projects</span>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="TechNex Office" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-it-blue-light bg-opacity-20 flex items-center justify-center mb-6 mx-auto">
                  <Target className="h-8 w-8 text-it-blue-dark" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Our Mission</h3>
                <p className="text-gray-600 text-center">
                  To empower businesses to achieve their full potential through innovative technology solutions, expert guidance, and exceptional service.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-it-blue-light bg-opacity-20 flex items-center justify-center mb-6 mx-auto">
                  <Clock className="h-8 w-8 text-it-blue-dark" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Our Vision</h3>
                <p className="text-gray-600 text-center">
                  To be the global leader in technology services, recognized for driving digital transformation, fostering innovation, and creating lasting value for our clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide our work and define our culture
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We embrace new ideas and technologies to solve complex challenges and drive continuous improvement."
              },
              {
                title: "Excellence",
                description: "We are committed to delivering the highest quality of work in everything we do."
              },
              {
                title: "Integrity",
                description: "We conduct business ethically and honestly, building trust with our clients and partners."
              },
              {
                title: "Collaboration",
                description: "We work together across teams, disciplines, and borders to achieve common goals."
              },
              {
                title: "Client Focus",
                description: "We put our clients at the center of everything we do, focusing on their success."
              },
              {
                title: "Diversity",
                description: "We value diverse perspectives and create an inclusive environment where everyone can thrive."
              }
            ].map((value, index) => (
              <Card key={index} className="service-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Meet the experienced professionals guiding our company
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Chief Executive Officer",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Sarah Williams",
                role: "Chief Technology Officer",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Michael Chen",
                role: "Chief Operations Officer",
                image: "https://randomuser.me/api/portraits/men/67.jpg"
              },
              {
                name: "Emma Rodriguez",
                role: "Chief Marketing Officer",
                image: "https://randomuser.me/api/portraits/women/28.jpg"
              }
            ].map((leader, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold">{leader.name}</h3>
                <p className="text-gray-600">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-it-blue text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            We're always looking for talented individuals to join our team and help us build innovative solutions for our clients.
          </p>
          <Button asChild className="bg-white text-it-blue hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-md">
            <Link to="/careers">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
