
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe,
  Code,
  Server,
  Cpu,
  PenTool,
  Building,
  Users,
  GraduationCap,
  Briefcase,
  ShieldCheck
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navigationLinks = [
    { name: "Home", path: "/" },
    { 
      name: "About", 
      path: "/about",
      dropdown: false
    },
    { 
      name: "Services", 
      path: "/services",
      dropdown: true,
      items: [
        { name: "App Development", path: "/services/app-development", icon: Code },
        { name: "Cloud Services", path: "/services/cloud", icon: Server },
        { name: "AI & Machine Learning", path: "/services/ai", icon: Cpu },
        { name: "Digital Strategy", path: "/services/digital-strategy", icon: PenTool },
      ]
    },
    { 
      name: "Industries", 
      path: "/industries",
      dropdown: true,
      items: [
        { name: "Banking & Finance", path: "/industries/banking", icon: Building },
        { name: "Healthcare", path: "/industries/healthcare", icon: Users },
        { name: "Retail", path: "/industries/retail", icon: Globe },
      ]
    },
    { 
      name: "Careers", 
      path: "/careers",
      dropdown: true,
      items: [
        { name: "Full-time Positions", path: "/careers", icon: Briefcase },
        { name: "Internships", path: "/internships", icon: GraduationCap },
      ]
    },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin", icon: ShieldCheck }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold text-it-blue-dark">Tech Instance</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex items-center text-gray-700 hover:text-it-blue font-medium"
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="absolute left-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="py-2">
                          {link.items?.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-it-blue-light hover:text-white"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <item.icon className="mr-3 h-5 w-5" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="text-gray-700 hover:text-it-blue font-medium"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigationLinks.map((link) => (
              <div key={link.name} className="py-2">
                {link.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex w-full items-center justify-between text-gray-700 py-2"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="mt-2 pl-4 space-y-2">
                        {link.items?.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center py-2 text-gray-600 hover:text-it-blue"
                            onClick={() => {
                              setActiveDropdown(null);
                              setIsMenuOpen(false);
                            }}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="block py-2 text-gray-700 hover:text-it-blue"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

