import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_LINK } from '../constants';

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
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-light to-brand-accent flex items-center justify-center text-brand-dark font-bold group-hover:rotate-12 transition-transform">
                  S
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-brand-dark dark:text-brand-light">StarterKart</span>
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
                {isAdmin && <NavLink to="/admin" label="Admin Dashboard" />}
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
              {isAdmin && <NavLink to="/admin" label="Admin Dashboard" />}
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
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-brand-light flex items-center justify-center text-brand-dark font-bold text-xs">S</div>
                <span className="font-display font-bold text-lg text-brand-dark dark:text-brand-light">StarterKart</span>
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
            <div className="flex space-x-6 mt-4 md:mt-0">
               {/* Social icons placeholder */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};