export const mansionData = {
  pool: {
    title: "The Pool",
    emoji: "🏊‍♂️",
    description: "Swimming is my sanctuary for fitness and mental clarity. Competing at a national level has taught me discipline, perseverance, and the importance of consistent effort toward long-term goals.",
    details: [
      "500+ kilometers swam annually",
      "Regional competitive swimmer",
      "Morning routine: focused lap sessions",
      "Meditation in motion - where I do my best thinking"
    ]
  },
  badminton: {
    title: "Badminton Court",
    emoji: "🏸",
    description: "As Team Canada's Junior National Team member and #2 Under 17 in Canada, badminton has shaped my competitive spirit and strategic thinking. Fast-paced, strategic, and incredibly rewarding.",
    details: [
      "Team Canada | Junior National Team",
      "Ranked #2 Under 17 in Canada",
      "Represented Canada at 2023 XXVI Yonex PanAm Championship",
      "YONEX Sponsorship Representative - distributed $7,000+ in equipment"
    ]
  },
  chess: {
    title: "Chess Room",
    emoji: "♟️",
    description: "The quiet battlefield where strategy reigns supreme. Chess trains me to think several moves ahead - a skill that translates directly to software architecture and problem-solving in development.",
    details: [
      "Current rating: 1936 ELO",
      "Favorite opening: Sicilian Defense",
      "Daily tactical puzzle practice",
      "Pattern recognition master"
    ]
  },
  kitchen: {
    title: "Gourmet Kitchen",
    emoji: "👨‍🍳",
    description: "Cooking is my creative outlet and a way to explore different cultures. From experimenting with fusion recipes to perfecting classics, the kitchen is where precision meets creativity.",
    details: [
      "Specialty: Cultural fusion dishes",
      "Exploring authentic recipes from around the world",
      "Weekend projects: Advanced techniques",
      "Food as a lens for understanding cultures"
    ]
  },
  trading: {
    title: "Trading Office",
    emoji: "📈",
    description: "My passion for penny stocks and market analysis. I love studying market patterns, understanding business fundamentals, and making calculated investment decisions. This interest fuels my curiosity about fintech and data analytics.",
    details: [
      "Focus: Penny stocks and market microstructure",
      "Interest in venture capital and tech startups",
      "Trading philosophy: Research-driven decisions",
      "Tools: Market analytics and charting platforms"
    ]
  }
};

export const aboutData = {
  name: "Maxwell Peng",
  title: "Full Stack Developer & Problem Solver",
  description: "Welcome to the mansion tour. If you're here for vibes: badminton, chess, and whatever rabbit hole I'm obsessed with this month. Each room is a different slice of my brain.",
  location: "London, ON | Originally from Oakville, ON",
  email: "mpeng57@uwo.ca",
  github: "https://github.com/thecodemonki",
  linkedin: "https://www.linkedin.com/in/maxwell-peng-070116246/",
  phone: "(647) 562-2398"
};

export const educationData = {
  school: "Western University",
  location: "London, ON",
  degree: "Bachelor of Arts in Computer Science",
  graduation: "Expected August 2029",
  gpa: "3.95/4.0",
  sat: "1540",
  awards: [
    "Western Scholarship of Distinction ($3,500)",
    "Lillian H. Parsons Bursary ($1,000)",
    "EY x Accenture Case Competition Finalist"
  ],
  coursework: [
    "Computer Science Fundamentals I & II",
    "Foundations of Computer Science"
  ]
};

export const experienceData = [
  {
    id: 0,
    company: "Autumn",
    role: "Software-Engineer Intern — Remote",
    location: "London, ON",
    period: "March 2025 - Present",
    description: "Engineering provider onboarding flow and pre-fill system for grief counselors.",
    achievements: [
      "Engineered a provider onboarding flow (27 screens, 7 steps) in Next.js with Zustand, Prisma/PostgreSQL, and a weighted real-time completion scoring engine for grief counselors to publish SEO-structured profiles on autumn.co",
      "Built a LinkedIn and website scrape-to-prefill system using Puppeteer with silent failure handling, JWT magic-link resume, and Inngest-scheduled abandonment email sequences to minimize drop-off across a 15–20 minute onboarding flow"
    ],
    tech: ["Next.js", "Zustand", "Prisma", "PostgreSQL", "Puppeteer", "Inngest", "JWT"]
  },
  {
    id: 1,
    company: "AtlasHaus Design",
    role: "Software Engineer Intern",
    location: "Remote - Ottawa, ON",
    period: "November 2025 – Present",
    description: "Engineering custom Shopify solutions and optimizing e-commerce performance.",
    achievements: [
      "Engineered custom Shopify product pages using Liquid templates and JavaScript, implementing dynamic FAQ accordions and SEO-optimized structured data markup",
      "Enhanced e-commerce conversion funnel through Google Analytics and heat mapping analysis, optimizing content hierarchy and checkout flow",
      "Boosted mobile page speeds by 20% through optimized Liquid templates and strategic media lazy-loading"
    ],
    tech: ["Liquid", "JavaScript", "Shopify", "Google Analytics", "SEO"]
  },
  {
    id: 2,
    company: "Western Founders Network",
    role: "Projects Director",
    location: "London, ON",
    period: "September 2025 – Present",
    description: "Leading technical education and project mentorship for 700+ members.",
    achievements: [
      "Led a team of 20+ to design and deliver weekly JavaScript, HTML, and CSS workshops, increasing technical engagement by 35%",
      "Organized and mentored project teams during hackathons through ideation, technical scoping, and MVP development",
      "Coordinated annual flagship Project Demo Day where 30+ teams present to industry judges - past teams earned 20+ interviews at IBM, Meta, Shopify, and notable startups"
    ],
    tech: ["JavaScript", "React", "Node.js", "Workshop Design", "Team Leadership"]
  },
  {
    id: 3,
    company: "Fae AI",
    role: "Marketing and Growth",
    location: "Remote - New York",
    period: "October 2025 – February 2026",
    description: "Led content strategy for pre-seed AI startup, achieving viral growth.",
    achievements: [
      "Led UGC and short-form content strategy across TikTok, Instagram, and YouTube",
      "Grew brand to 19K followers and 1.4M views in under a month through high-performing, trend-driven content",
      "Achieved 6-8% average engagement rate through relatable AI content (fitness, productivity, emotional support)"
    ],
    tech: ["Social Media Strategy", "Content Creation", "Analytics", "Growth Hacking"]
  },
  {
    id: 4,
    company: "Team Canada | Badminton",
    role: "Junior National Team",
    location: "Oakville, ON",
    period: "September 2020 – Present",
    description: "Competing at national level while managing athletic and academic commitments.",
    achievements: [
      "Ranked #2 Under 17 in Canada",
      "Represented Canada at 2023 XXVI Yonex PanAm Individual Championship",
      "Served as YONEX Sponsorship Representative - distributed over $7,000 in equipment, driving 15% increase in athlete engagement"
    ],
    tech: ["Performance Analytics", "Team Collaboration", "Leadership"]
  }
];

export const projectsData = [
  {
    id: 1,
    title: "Interview Royale",
    description: "Real-time multiplayer interview practice platform supporting 10+ concurrent users with WebSocket-based communication, live video/audio streaming at 15 FPS, and OpenAI-powered answer evaluation using STAR method criteria.",
    tech: ["TypeScript", "Python", "FastAPI", "WebSocket", "OpenAI API"],
    link: "https://interviewroyale.com/",
    color: "#667eea",
    highlights: [
      "RESTful API endpoints with sub-100ms latency",
      "Proximity-based spatial audio with distance attenuation",
      "Synchronized game state across distributed clients"
    ]
  },
  {
    id: 2,
    title: "Western Founders Network Projects Website",
    description: "React website for WFN club featuring dynamic team and member profile pages, creating a centralized platform for 700+ users to explore organizational structure and discover executive responsibilities.",
    tech: ["JavaScript", "React", "HTML", "CSS", "Vite", "React Router"],
    link: "https://github.com/yourusername/wfn-projects",
    color: "#4a90e2",
    highlights: [
      "Reusable React components and structured routing",
      "Collaborative development through GitHub branches",
      "Serves 700+ active club members"
    ]
  },
  {
    id: 3,
    title: "DayFlow Chrome Extension",
    description: "Full-featured Chrome extension to improve productivity with website white/blacklisting, focus timers, inactivity dimming, and lock-in modes. Includes usage analytics tracking daily, weekly, and monthly browsing behavior.",
    tech: ["JavaScript", "HTML", "CSS", "Chrome Extensions API"],
    link: "https://chromewebstore.google.com/detail/dayflow/pfoklgkdgoebldeobkgjcfencpjjlokp",
    githubRepo: "https://github.com/thecodemonki/DayFlow",
    color: "#2ecc71",
    highlights: [
      "Reduces distractions by 40-60% for users",
      "Data-driven habit insights and streak-based motivation",
      "Custom reminders for posture and eye-strain checks"
    ]
  },
  {
    id: 4,
    title: "Dream Mansion Portfolio",
    description: "Interactive dual-mode portfolio website combining a professional showcase with an immersive 2D exploration game. Features custom AI-generated assets and smooth routing between modes.",
    tech: ["React", "Vite", "React Router", "Framer Motion", "CSS"],
    link: "#",
    color: "#d4af37",
    highlights: [
      "Dual-mode experience: Portfolio + Interactive game",
      "Custom AI-generated assets for each room",
      "Responsive design with smooth animations"
    ]
  },
  {
    id: 5,
    title: "StockTok",
    description: "Full stack mobile app (React Native + Expo) to dynamically price TikTok videos using custom valuation formulas based on real-time metrics. Includes full trading, portfolio, and social capabilities.",
    tech: ["React Native", "Expo", "Python", "FastAPI", "Supabase", "Railway"],
    link: "https://github.com/kevinli5371/wfn-projects2026",
    color: "#ff3b30",
    highlights: [
      "Built a REST API using Python/FastAPI with Supabase to handle auth, video scraping, and portfolio management",
      "Designed a custom valuation formula pricing TikTok videos via logarithmic growth and real-time view counts",
      "Implemented parallel TikTok video scraping using Python's ThreadPoolExecutor to refresh portfolio stats across multiple assets",
      "Developed a sell system supporting partial liquidation across multiple investment tranches with transaction fees",
      "Built a global auth context and social groups feature for leaderboards and cooperative play"
    ]
  }
];

export const interestsData = [
  "Penny Stocks & Trading",
  "Basketball & Swimming (Regional)",
  "Chess (ELO: 1936)",
  "Cultural Foods & Cooking",
  "Venture Capital & Tech Startups",
  "Game Development (Roblox)",
  "Western Founders Network - Software Engineer",
  "Western Science Student Council - Finance Director",
  "Varsity Badminton"
];