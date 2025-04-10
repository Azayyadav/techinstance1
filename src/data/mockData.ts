
export interface JobListing {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  salary: string;
  type: string; // Full-time, Part-time, Contract, Internship
  postedDate: string;
}

export interface JobApplication {
  id: string;
  name: string;
  email: string;
  position: string;
  jobType: string;
  resumeUrl: string;
  appliedDate: string;
}

// Mock job listings data
export const mockJobListings: JobListing[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    description: "We are looking for a skilled Senior Full Stack Developer to join our growing engineering team.",
    location: "San Francisco, CA",
    department: "Engineering",
    salary: "$120K - $150K",
    type: "Full-time",
    postedDate: "2 days ago"
  },
  {
    id: "2",
    title: "UX/UI Designer",
    description: "Join our design team to create intuitive and engaging user experiences for our clients' digital products.",
    location: "Remote",
    department: "Design",
    salary: "$90K - $120K",
    type: "Full-time",
    postedDate: "1 week ago"
  },
  {
    id: "3",
    title: "DevOps Engineer",
    description: "We're seeking an experienced DevOps Engineer to help build and maintain our cloud infrastructure.",
    location: "New York, NY",
    department: "Operations",
    salary: "$110K - $140K",
    type: "Full-time",
    postedDate: "3 days ago"
  },
  {
    id: "4",
    title: "Data Science Intern",
    description: "Join our data science team as an intern to develop and implement machine learning models.",
    location: "Boston, MA",
    department: "Data",
    salary: "$30 - $40 per hour",
    type: "Internship",
    postedDate: "5 days ago"
  },
  {
    id: "5",
    title: "Marketing Intern",
    description: "Assist our marketing team with campaigns, social media, and content creation.",
    location: "Chicago, IL",
    department: "Marketing",
    salary: "$25 - $35 per hour",
    type: "Internship",
    postedDate: "2 weeks ago"
  },
  {
    id: "6",
    title: "Quality Assurance Engineer",
    description: "Join our QA team to ensure the quality of our software products.",
    location: "Remote",
    department: "Quality Assurance",
    salary: "$85K - $110K",
    type: "Full-time",
    postedDate: "1 week ago"
  }
];

// Mock job applications data
export const mockApplications: JobApplication[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    position: "Senior Full Stack Developer",
    jobType: "Full-time",
    resumeUrl: "https://example.com/resumes/john-smith.pdf",
    appliedDate: "Apr 5, 2025"
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    position: "UX/UI Designer",
    jobType: "Full-time",
    resumeUrl: "https://example.com/resumes/emily-johnson.pdf",
    appliedDate: "Apr 2, 2025"
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    position: "DevOps Engineer",
    jobType: "Full-time",
    resumeUrl: "https://example.com/resumes/michael-chen.pdf",
    appliedDate: "Apr 7, 2025"
  },
  {
    id: "4",
    name: "Sarah Rodriguez",
    email: "sarah.rodriguez@example.com",
    position: "Data Science Intern",
    jobType: "Internship",
    resumeUrl: "https://example.com/resumes/sarah-rodriguez.pdf",
    appliedDate: "Apr 6, 2025"
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@example.com",
    position: "Marketing Intern",
    jobType: "Internship",
    resumeUrl: "https://example.com/resumes/david-kim.pdf",
    appliedDate: "Mar 30, 2025"
  },
  {
    id: "6",
    name: "Amanda Patel",
    email: "amanda.patel@example.com",
    position: "Quality Assurance Engineer",
    jobType: "Full-time",
    resumeUrl: "https://example.com/resumes/amanda-patel.pdf",
    appliedDate: "Apr 5, 2025"
  }
];
