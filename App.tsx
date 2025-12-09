import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { useStore } from './context/StoreContext';
import { FadeIn, StaggerContainer } from './components/Animation';

// Simple placeholder components for pages not fully detailed in the prompt request but required for structure
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-display font-bold text-brand-dark dark:text-white mb-4">{title}</h1>
        <p className="text-gray-500 max-w-lg">
            This page is part of the full site structure. In a production environment, specific content for {title} would go here.
        </p>
    </div>
);

const ServicesPage: React.FC = () => {
    const { data } = useStore();
    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
             <div className="text-center mb-16">
                <h1 className="text-4xl font-display font-bold text-brand-dark dark:text-white mb-4">Shopify Services</h1>
                <p className="text-gray-600 dark:text-gray-400">Specialized technical and design customization</p>
            </div>
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
                {data.services.map(s => (
                    <div key={s.id} className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex gap-4">
                        <div className="shrink-0 w-12 h-12 bg-brand-light/20 rounded-lg flex items-center justify-center text-brand-light font-bold text-xl">
                            {s.title[0]}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">{s.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{s.description}</p>
                        </div>
                    </div>
                ))}
            </StaggerContainer>
        </div>
    )
}

const PortfolioPage: React.FC = () => {
    const { data } = useStore();
    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
             <div className="text-center mb-16">
                <h1 className="text-4xl font-display font-bold text-brand-dark dark:text-white mb-4">My Portfolio</h1>
                <p className="text-gray-600 dark:text-gray-400">Recent Shopify customizations</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.projects.map(p => (
                     <FadeIn key={p.id} className="group rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <div className="aspect-video w-full flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                             {(p.images && p.images.length > 0 ? p.images : [p.imageUrl]).map((img, idx) => (
                                <img key={idx} src={img} alt={`${p.title} ${idx+1}`} className="w-full h-full object-cover flex-shrink-0 snap-center" />
                             ))}
                        </div>
                         {/* Slide Indicators for multiple images */}
                         {p.images && p.images.length > 1 && (
                             <div className="flex justify-center gap-1 mt-2 mb-2">
                                {p.images.map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-white/30" />
                                ))}
                             </div>
                         )}

                        <div className="p-6">
                            <div className="text-xs font-bold text-brand-light uppercase tracking-wider mb-2">{p.shopifyTheme} Theme</div>
                            <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">{p.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{p.description}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    )
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/pricing" element={<Home />} /> {/* Re-using Home sections for simplicity in SPA */}
            <Route path="/testimonials" element={<Home />} />
            
            {/* Standard Pages */}
            <Route path="/about" element={<PlaceholderPage title="About Me" />} />
            <Route path="/faq" element={<PlaceholderPage title="Frequently Asked Questions" />} />
            <Route path="/terms" element={<PlaceholderPage title="Terms & Conditions" />} />
            <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </StoreProvider>
  );
}

export default App;