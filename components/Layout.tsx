import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_LINK } from '../constants';

// Custom Logo Component
const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#45f3ff" />
        <stop offset="50%" stopColor="#E0B1CB" />
        <stop offset="100%" stopColor="#9F86C0" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Abstract Cart/Bag Shape with S curve integration */}
    <g filter="url(#glow)">
        <path 
            d="M30 35 C30 20 70 20 70 35 V45 H82 C86 45 90 49 90 53 V82 C90 86 86 90 82 90 H18 C14 90 10 86 10 82 V53 C10 49 14 45 18 45 H30 V35 Z" 
            fill="url(#logo_grad)" 
        />
        {/* The 'Handle' Hole */}
        <path 
            d="M40 45 V35 C40 28 60 28 60 35 V45 H40 Z" 
            fill="#1c1c25" 
            fillOpacity="0.2"
        />
    </g>

    {/* The 'S' / Lightning Bolt Cutout symbolizing Speed & Code */}
    <path 
        d="M45 55 L65 55 L40 70 L60 70 L35 82 L45 65 L25 65 L50 50 L45 55 Z" 
        fill="#1c1c25" // Matches dark background
        stroke="#1c1c25"
        strokeWidth="2"
        strokeLinejoin="round"
    />
  </svg>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useStore();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle Dark Mode (Basic implementation for Tailwind 'class' strategy)
  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.remove('dark');
    } else {
      html.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Ensure dark mode is on by default on mount
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const NavLink = ({ to, label }: { to: string, label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive 
            ? 'text-brand-light bg-brand-surface bg-opacity-30' 
            : 'text-gray-300 hover:text-brand-light hover:bg-white/5'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-brand-dark text-gray-800 dark:text-gray-100`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-brand-dark/80 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                {/* Logo with hover effect */}
                <div className="group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                    <Logo className="w-10 h-10" />
                </div>
                <div className="flex flex-col justify-center">
                    <span className="font-display font-bold text-xl tracking-tight leading-none text-brand-dark dark:text-white">
                        Starter<span className="text-[#45f3ff]">Kart</span>
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-400 dark:text-gray-400 leading-none mt-1">
                        Shopify Expert
                    </span>
                </div>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" label="Home" />
                <NavLink to="/services" label="Services" />
                <NavLink to="/portfolio" label="Portfolio" />
                <NavLink to="/pricing" label="Pricing" />
                <NavLink to="/testimonials" label="Testimonials" />
                <NavLink to="/contact" label="Contact" />
                {isAdmin && <NavLink to="/admin" label="Dashboard" />}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-brand-dark dark:text-brand-light transition-colors">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-light text-brand-dark px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  WhatsApp Me
                </a>
            </div>

            <div className="-mr-2 flex md:hidden gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-brand-dark dark:text-brand-light">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-dark border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <NavLink to="/" label="Home" />
              <NavLink to="/services" label="Services" />
              <NavLink to="/portfolio" label="Portfolio" />
              <NavLink to="/pricing" label="Pricing" />
              <NavLink to="/testimonials" label="Testimonials" />
              <NavLink to="/contact" label="Contact" />
              {isAdmin && <NavLink to="/admin" label="Dashboard" />}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#1a1233] border-t border-gray-200 dark:border-white/5 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Logo className="w-8 h-8" />
                <span className="font-display font-bold text-lg text-brand-dark dark:text-white">
                    Starter<span className="text-[#45f3ff]">Kart</span>
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
                Elevating Shopify stores with custom themes, sections, and professional branding. 
                Expert in Impact, Impulse, and Dawn themes.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-light tracking-wider uppercase mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-brand-light text-sm">Theme Customisation</Link></li>
                <li><Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-brand-light text-sm">Speed Optimisation</Link></li>
                <li><Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-brand-light text-sm">Product Page Design</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-light tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-brand-light text-sm">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-brand-light text-sm">Privacy Policy</Link></li>
                <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-brand-light text-sm">FAQ</Link></li>
                <li><Link to="/admin" className="text-gray-600 dark:text-gray-400 hover:text-brand-light text-sm mt-4 block opacity-50">Admin Login</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} StarterKart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};