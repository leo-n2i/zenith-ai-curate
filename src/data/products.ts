export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  price: string;
  features: string[];
  image: string;
  isNextCore?: boolean;
}

export const categories = [
  "All Products",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Marketing",
  "Customer Support",
  "HR & Recruiting",
  "Education",
  "Real Estate",
  "AI Infrastructure"
];

export const products: Product[] = [
  {
    id: "nextcore",
    name: "NextCore",
    category: "AI Infrastructure",
    shortDescription: "Enterprise AI core infrastructure platform for scalable solutions",
    description: "NextCore is a comprehensive AI infrastructure platform designed for enterprises requiring scalable, secure, and high-performance AI solutions.",
    price: "Starting at $299/mo",
    features: [
      "Scalable AI infrastructure",
      "Advanced security features",
      "Real-time analytics dashboard"
    ],
    image: "/placeholder.svg",
    isNextCore: true
  },
  {
    id: "mediscan-ai",
    name: "MediScan AI",
    category: "Healthcare",
    shortDescription: "AI-powered medical imaging analysis and diagnosis assistant",
    description: "Advanced AI system for analyzing medical images with high accuracy, supporting radiologists in faster and more precise diagnoses.",
    price: "Starting at $199/mo",
    features: [
      "99% accuracy in imaging analysis",
      "HIPAA compliant platform",
      "Integration with major EHR systems"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "finwise-analytics",
    name: "FinWise Analytics",
    category: "Finance",
    shortDescription: "Intelligent financial forecasting and risk assessment platform",
    description: "Leverage AI to predict market trends, assess investment risks, and optimize portfolio management with real-time insights.",
    price: "Starting at $399/mo",
    features: [
      "Real-time market analysis",
      "Risk prediction algorithms",
      "Automated compliance reporting"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "shopflow-optimizer",
    name: "ShopFlow Optimizer",
    category: "E-commerce",
    shortDescription: "AI-driven customer journey and conversion optimization tool",
    description: "Maximize your e-commerce conversions with AI-powered personalization, dynamic pricing, and intelligent product recommendations.",
    price: "Starting at $149/mo",
    features: [
      "Personalized shopping experiences",
      "Dynamic pricing engine",
      "Abandoned cart recovery AI"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "campaigncraft-ai",
    name: "CampaignCraft AI",
    category: "Marketing",
    shortDescription: "AI marketing campaign generator and performance optimizer",
    description: "Create, launch, and optimize marketing campaigns across all channels with AI-generated content and predictive performance insights.",
    price: "Starting at $179/mo",
    features: [
      "Multi-channel campaign automation",
      "AI content generation",
      "Predictive ROI analytics"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "supportiq",
    name: "SupportIQ",
    category: "Customer Support",
    shortDescription: "AI chatbot and ticket resolution automation platform",
    description: "Reduce support costs by 60% with an AI assistant that handles common queries and routes complex issues intelligently.",
    price: "Starting at $99/mo",
    features: [
      "24/7 automated support",
      "Natural language processing",
      "Multi-language support (50+ languages)"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "talentmatch-pro",
    name: "TalentMatch Pro",
    category: "HR & Recruiting",
    shortDescription: "AI-powered recruitment and candidate matching system",
    description: "Find the perfect candidates faster with AI that screens resumes, matches skills, and predicts cultural fit.",
    price: "Starting at $249/mo",
    features: [
      "Automated resume screening",
      "Predictive candidate scoring",
      "Bias-free hiring algorithms"
    ],
    image: "/placeholder.svg"
  },
  {
    id: "edumate-learning",
    name: "EduMate Learning",
    category: "Education",
    shortDescription: "Adaptive AI learning platform with personalized curriculum",
    description: "Transform education with AI that adapts to each student's learning pace, style, and needs, ensuring optimal outcomes.",
    price: "Starting at $79/mo",
    features: [
      "Personalized learning paths",
      "Real-time progress tracking",
      "Automated grading and feedback"
    ],
    image: "/placeholder.svg"
  }
];

export const bundles = [
  {
    id: "startup-growth",
    name: "Startup Growth Pack",
    description: "Everything you need to launch and scale your startup",
    products: ["ShopFlow Optimizer", "CampaignCraft AI", "SupportIQ"],
    originalPrice: "$427/mo",
    bundlePrice: "$299/mo",
    savings: "30%"
  },
  {
    id: "enterprise-suite",
    name: "Enterprise AI Suite",
    description: "Complete enterprise-grade AI infrastructure",
    products: ["NextCore", "FinWise Analytics", "TalentMatch Pro", "SupportIQ"],
    originalPrice: "$846/mo",
    bundlePrice: "$649/mo",
    savings: "23%"
  },
  {
    id: "healthcare-bundle",
    name: "Healthcare Innovation Bundle",
    description: "Comprehensive AI solutions for healthcare providers",
    products: ["MediScan AI", "NextCore", "SupportIQ"],
    originalPrice: "$597/mo",
    bundlePrice: "$449/mo",
    savings: "25%"
  },
  {
    id: "marketing-powerhouse",
    name: "Marketing Powerhouse",
    description: "Complete marketing automation and optimization suite",
    products: ["CampaignCraft AI", "ShopFlow Optimizer", "FinWise Analytics"],
    originalPrice: "$727/mo",
    bundlePrice: "$549/mo",
    savings: "24%"
  }
];
