export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Main thumbnail / Fallback
  images?: string[]; // Array of image URLs for slideshow/scroll
  shopifyTheme: string; // e.g., Dawn, Impulse
  link?: string;
  featured?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  businessName: string;
  content: string;
  rating: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  theme: string;
  message: string;
  date: string;
}

export interface AppData {
  services: Service[];
  projects: Project[];
  plans: Plan[];
  testimonials: Testimonial[];
  inquiries: ContactSubmission[];
}