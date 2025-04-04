import { useState } from "react";
import { MapPin, Phone, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "@/components/GoogleMap";

// Office locations data
const officeLocations = [
  { 
    city: "San Francisco", 
    country: "USA", 
    address: "123 Tech Park, CA 94025",
    position: { lat: 37.7749, lng: -122.4194 }
  },
  { 
    city: "New York", 
    country: "USA", 
    address: "456 Broadway, NY 10013",
    position: { lat: 40.7128, lng: -74.0060 }
  },
  { 
    city: "London", 
    country: "UK", 
    address: "78 Tech Square, London EC1V 9BX",
    position: { lat: 51.5074, lng: -0.1278 }
  },
  { 
    city: "Singapore", 
    country: "Singapore", 
    address: "90 Fintech Center, Singapore 049315",
    position: { lat: 1.3521, lng: 103.8198 }
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };
  
  // Add state for the selected location
  const [selectedLocation, setSelectedLocation] = useState(officeLocations[0]);

  const handleLocationSelect = (location: typeof officeLocations[0]) => {
    setSelectedLocation(location);
    // Smooth scroll to map
    document.querySelector('.map-wrapper')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };
  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-it-gray-light to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Get in touch with our team to discuss your IT needs and how we can help transform your business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team is here to answer your questions and discuss how TechNex can help your business succeed with innovative IT solutions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-it-blue-light bg-opacity-20 flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-6 w-6 text-it-blue-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Headquarters</h3>
                    <p className="text-gray-600">
                      123 Tech Park, Silicon Valley<br />
                      California, USA 94025
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-it-blue-light bg-opacity-20 flex items-center justify-center mr-4 mt-1">
                    <Phone className="h-6 w-6 text-it-blue-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <p className="text-gray-600">
                      Main Office: +1 (555) 123-4567<br />
                      Customer Support: +1 (555) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-it-blue-light bg-opacity-20 flex items-center justify-center mr-4 mt-1">
                    <Mail className="h-6 w-6 text-it-blue-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <p className="text-gray-600">
                      General Inquiries: <a href="mailto:info@technex.com" className="text-it-blue">info@technex.com</a><br />
                      Support: <a href="mailto:support@technex.com" className="text-it-blue">support@technex.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-it-blue-light bg-opacity-20 flex items-center justify-center mr-4 mt-1">
                    <MessageSquare className="h-6 w-6 text-it-blue-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM (EST)<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "linkedin", "instagram"].map(social => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-it-blue hover:text-white transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5 bg-current rounded-sm"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">Full Name *</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block">Email Address *</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="mb-2 block">Company Name</Label>
                      <Input 
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="subject" className="mb-2 block">Subject *</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="message" className="mb-2 block">Message *</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-it-blue-dark hover:bg-it-blue text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-it-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Locations</h2>
            <p className="text-lg text-gray-600">
              With offices around the world, we're ready to serve your business wherever you are.
            </p>
          </div>
          
          <div className="bg-white h-96 rounded-lg overflow-hidden shadow-lg map-wrapper">
            <GoogleMap 
              height="384px"
              center={selectedLocation.position}
              markerTitle={`TechNex ${selectedLocation.city}`}
              zoom={15}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {officeLocations.map((location, index) => (
              <div 
                key={index} 
                className={`bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedLocation.city === location.city ? 'ring-2 ring-it-blue border-it-blue-light' : ''
                }`}
                onClick={() => handleLocationSelect(location)}
              >
                <h3 className="font-semibold text-lg">{location.city}</h3>
                <p className="text-gray-500">{location.country}</p>
                <p className="text-gray-600 mt-2">{location.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services and how we work with clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What industries do you serve?",
                answer: "We serve a wide range of industries including Banking & Finance, Healthcare, Retail, Manufacturing, Logistics, Energy, Education, and Professional Services."
              },
              {
                question: "How do you ensure the security of my data?",
                answer: "We implement industry-leading security measures, including encryption, secure coding practices, regular security audits, and compliance with relevant standards and regulations."
              },
              {
                question: "What is your typical project timeline?",
                answer: "Project timelines vary depending on scope and complexity. We work closely with clients to establish realistic timelines and milestones, keeping you informed at every step."
              },
              {
                question: "Do you offer ongoing support after project completion?",
                answer: "Yes, we offer various support and maintenance options to ensure your solutions continue to perform optimally and evolve with your business needs."
              },
              {
                question: "How do you handle project changes or new requirements?",
                answer: "We follow an agile approach that allows for flexibility. Changes are evaluated, documented, and implemented through a structured change management process."
              },
              {
                question: "What makes TechNex different from other IT companies?",
                answer: "Our combination of deep industry expertise, technical excellence, client-focused approach, and commitment to long-term partnerships sets us apart from other IT service providers."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
