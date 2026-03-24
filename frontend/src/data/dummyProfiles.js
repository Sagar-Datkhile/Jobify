// Dummy profile data for demonstration
export const dummyProfiles = {
  seeker1: {
    type: "seeker",
    id: "seeker1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Love working with modern technologies and solving complex problems. Always eager to learn new skills and contribute to innovative projects.",
    skills:
      "JavaScript, React, Node.js, Python, MongoDB, PostgreSQL, AWS, Docker, Git",
    experience:
      "Senior Software Engineer at Tech Corp (2021-Present)\n• Led development of microservices architecture serving 1M+ users\n• Mentored junior developers and conducted code reviews\n• Implemented CI/CD pipelines reducing deployment time by 60%\n\nFull Stack Developer at StartupXYZ (2019-2021)\n• Built responsive web applications using React and Node.js\n• Designed and implemented RESTful APIs\n• Collaborated with cross-functional teams in agile environment",
    education:
      "Bachelor of Science in Computer Science\nStanford University, 2019\nGPA: 3.8/4.0\n\nRelevant Coursework:\n• Data Structures and Algorithms\n• Database Systems\n• Web Development\n• Machine Learning",
  },
  seeker2: {
    type: "seeker",
    id: "seeker2",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    bio: "Creative UX/UI designer with a passion for creating intuitive and beautiful user experiences. 4 years of experience in design thinking, user research, and prototyping. Committed to accessibility and inclusive design practices.",
    skills:
      "Figma, Adobe XD, Sketch, Prototyping, User Research, Wireframing, Design Systems, HTML/CSS",
    experience:
      "Senior UX Designer at Design Studio (2022-Present)\n• Led redesign of e-commerce platform increasing conversion by 35%\n• Conducted user research and usability testing with 500+ participants\n• Created comprehensive design system used across 15+ products\n\nUX Designer at Digital Agency (2020-2022)\n• Designed mobile-first interfaces for various clients\n• Collaborated with developers to ensure design implementation\n• Presented design concepts to stakeholders and clients",
    education:
      "Master of Fine Arts in Interaction Design\nParsons School of Design, 2020\n\nBachelor of Arts in Graphic Design\nRhode Island School of Design, 2018",
  },
  employer1: {
    type: "employer",
    id: "employer1",
    companyName: "TechVision Solutions",
    industry: "Software Development & IT Services",
    companySize: "250-500",
    website: "https://www.techvisionsolutions.com",
    email: "careers@techvisionsolutions.com",
    phone: "+1 (555) 200-3000",
    location: "Austin, TX",
    description:
      "TechVision Solutions is a leading software development company specializing in enterprise solutions and cloud technologies. We're committed to innovation and excellence, helping businesses transform through technology.\n\nWhat We Offer:\n• Competitive salary and equity packages\n• Comprehensive health, dental, and vision insurance\n• Flexible remote work options\n• Professional development budget\n• Collaborative and inclusive work culture\n• Modern tech stack and tools\n• Regular team building events\n\nOur Mission:\nWe believe in empowering businesses through cutting-edge technology solutions while fostering a supportive environment where our team members can grow and thrive.",
  },
  employer2: {
    type: "employer",
    id: "employer2",
    companyName: "GreenLeaf Innovations",
    industry: "Sustainable Technology & CleanTech",
    companySize: "50-100",
    website: "https://www.greenleafinnovations.com",
    email: "jobs@greenleafinnovations.com",
    phone: "+1 (555) 400-5000",
    location: "Seattle, WA",
    description:
      "GreenLeaf Innovations is on a mission to create a sustainable future through technology. We develop innovative solutions for renewable energy management, smart agriculture, and environmental monitoring.\n\nWhy Join Us:\n• Work on projects that make a real environmental impact\n• Equity options for early team members\n• Flexible work arrangements and unlimited PTO\n• Learning and development opportunities\n• Green office spaces and eco-friendly culture\n• Collaborative startup environment\n• Health and wellness programs\n\nOur Values:\nWe're passionate about sustainability, innovation, and creating positive change. Join us in building technology that helps protect our planet for future generations.",
  },
};

// Function to get a profile by ID
export const getProfileById = (id) => {
  return dummyProfiles[id] || null;
};

// Function to get all profiles of a specific type
export const getProfilesByType = (type) => {
  return Object.values(dummyProfiles).filter(
    (profile) => profile.type === type
  );
};
