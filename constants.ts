import { AppData } from './types';

export const WHATSAPP_LINK = "https://wa.me/9818082449";

export const INITIAL_DATA: AppData = {
  services: [
    {
      id: '1',
      title: 'Theme Customisation',
      description: 'Expert adjustments for Impulse, Impact, Dawn, and Refresh themes.',
      icon: 'Palette'
    },
    {
      id: '2',
      title: 'Section Development',
      description: 'Adding custom liquid sections to your homepage or product pages.',
      icon: 'Layout'
    },
    {
      id: '3',
      title: 'Speed Optimisation',
      description: 'Improving core web vitals and loading times for better conversion.',
      icon: 'Zap'
    },
    {
      id: '4',
      title: 'Branding Setup',
      description: 'Aligning typography, colors, and layout with your brand identity.',
      icon: 'Brush'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Luxe Apparel Store',
      description: 'Full homepage overhaul using the Impulse theme.',
      imageUrl: 'https://picsum.photos/800/600?random=1',
      images: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=101',
        'https://picsum.photos/800/600?random=102'
      ],
      shopifyTheme: 'Impulse',
      featured: true
    },
    {
      id: '2',
      title: 'EcoHome Goods',
      description: 'Custom product page sections for sustainability features.',
      imageUrl: 'https://picsum.photos/800/600?random=2',
      images: [
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=201'
      ],
      shopifyTheme: 'Dawn',
      featured: true
    },
    {
      id: '3',
      title: 'TechGadget Hub',
      description: 'Speed optimisation and Impact theme styling.',
      imageUrl: 'https://picsum.photos/800/600?random=3',
      images: [
        'https://picsum.photos/800/600?random=3'
      ],
      shopifyTheme: 'Impact',
      featured: true
    }
  ],
  plans: [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$199',
      features: [
        'Theme Installation',
        'Logo & Font Setup',
        'Basic Color Branding',
        '2 Custom Sections',
        'Mobile Responsive Check'
      ],
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: '$499',
      features: [
        'Everything in Basic',
        'Homepage Redesign',
        'Product Page Customisation',
        'Speed Optimisation',
        'App Integration Setup',
        '5 Custom Sections'
      ],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$999',
      features: [
        'Full Custom Store Build',
        'Advanced Liquid Coding',
        'Custom Header/Footer',
        'Checkout Branding',
        'Priority Support',
        'Unlimited Sections'
      ],
      recommended: false
    }
  ],
  testimonials: [
    {
      id: '1',
      clientName: 'Sarah J.',
      businessName: 'Bloom Cosmetics',
      content: 'StarterKart completely transformed our Impulse theme. The speed score improved by 30 points!',
      rating: 5
    },
    {
      id: '2',
      clientName: 'Mike T.',
      businessName: 'Urban Gear',
      content: 'Professional and fast. Understood exactly what I needed for my product page layout.',
      rating: 5
    }
  ],
  inquiries: []
};