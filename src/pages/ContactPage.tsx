
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import GoogleMap, { officeLocations } from "@/components/GoogleMap";
import OfficeLocationSelector from "@/components/OfficeLocationSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("sf"); // Default to San Francisco
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally connect to your backend API
    // For now, just show a success toast
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setMessage("");
  };

  const selectedLocation = officeLocations.find(
    (loc) => loc.id === selectedLocationId
  );

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about our services or want to discuss a project? 
          Get in touch with our team and we'll be happy to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Your Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your project or inquiry"
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-it-blue-light mr-3 mt-1" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:info@techinstance.com" className="text-it-blue hover:underline">
                    info@techinstance.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-it-blue-light mr-3 mt-1" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-it-blue-light mr-3 mt-1" />
                <div>
                  <p className="font-medium">{selectedLocation?.name}</p>
                  <p>{selectedLocation?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <OfficeLocationSelector
            selectedLocationId={selectedLocationId}
            onLocationSelect={setSelectedLocationId}
          />
          
          <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
            <GoogleMap
              showAllLocations={true}
              selectedLocationId={selectedLocationId}
              zoom={12}
              height="500px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
