// Stats — honest product facts (no fabricated traction numbers).
// These describe what the platform offers, not invented usage metrics.
export const statsData = [
  { icon: "briefcase", value: 4, label: "Job Types", suffix: "" },
  { icon: "users", value: 2, label: "Ways to Join", suffix: "" },
  { icon: "building", value: 100, label: "Free to Use", suffix: "%" },
];

// Feature data
export const featuresData = {
  seekers: [
    {
      icon: "search",
      title: "Smart Job Search",
      description: "Find jobs matching your skills with powerful filters",
    },
    {
      icon: "click",
      title: "One-Click Apply",
      description: "Apply to jobs instantly with your saved profile",
    },
    {
      icon: "bell",
      title: "Job Alerts",
      description: "Get notified when new matching jobs are posted",
    },
  ],
  employers: [
    {
      icon: "post",
      title: "Easy Job Posting",
      description: "Create and publish job listings in minutes",
    },
    {
      icon: "filter",
      title: "Qualified Candidates",
      description: "Review applications from pre-screened talent",
    },
    {
      icon: "analytics",
      title: "Hiring Analytics",
      description: "Track your job performance and applicant flow",
    },
  ],
};

// Companies with listings in the demo dataset (matches the seed data).
export const companyLogos = ["Picsart", "TeamViewer Armenia", "ServiceTitan"];

// How it works steps
export const howItWorksData = {
  seekers: [
    {
      number: 1,
      icon: "user-plus",
      title: "Create Profile",
      description: "Sign up and build your professional profile",
    },
    {
      number: 2,
      icon: "search",
      title: "Browse Jobs",
      description: "Explore opportunities that match your skills",
    },
    {
      number: 3,
      icon: "send",
      title: "Apply & Track",
      description: "Submit applications and monitor progress",
    },
  ],
  employers: [
    {
      number: 1,
      icon: "building",
      title: "Register Company",
      description: "Create your employer account",
    },
    {
      number: 2,
      icon: "file-plus",
      title: "Post Jobs",
      description: "Describe roles and requirements",
    },
    {
      number: 3,
      icon: "users",
      title: "Hire Talent",
      description: "Review applicants and make offers",
    },
  ],
};

// Sample usage scenarios (illustrative, not real user reviews).
// Framed as "what the flow feels like" so nothing claims fabricated outcomes.
export const testimonialsData = [
  {
    quote:
      "Search and filter open roles by title, location, and type, then apply in a couple of clicks.",
    author: "Job Seeker",
    role: "Candidate flow",
  },
  {
    quote:
      "Post a listing, review incoming applications, and move candidates through your hiring pipeline.",
    author: "Employer",
    role: "Employer flow",
  },
  {
    quote:
      "Save interesting jobs and track every application's status from one dashboard.",
    author: "Job Seeker",
    role: "Candidate flow",
  },
];
