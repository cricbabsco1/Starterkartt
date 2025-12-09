import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Code, Star, ChevronLeft, ChevronRight, X, MessageSquarePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { FadeIn, StaggerContainer } from '../components/Animation';
import { WHATSAPP_LINK } from '../constants';
import { Testimonial } from '../types';

export const Home: React.FC = () => {
  const { data, addTestimonial } = useStore();
  
  // Filter projects to only show those marked as featured
  const displayProjects = data.projects.filter(p => p.featured);

  // Testimonial Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState<Partial<Testimonial>>({
    clientName: '',
    businessName: '',
    content: '',
    rating: 5
  });

  // Auto-play for carousel
  useEffect(() => {
    if (data.testimonials.length <= 1 || isReviewModalOpen) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentTestimonialIndex, data.testimonials.length, isReviewModalOpen]);

  const handleNext = () => {
    setDirection(1);
    setCurrentTestimonialIndex((prev) => (prev + 1) % data.testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentTestimonialIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewForm.clientName && reviewForm.content) {
        addTestimonial({
            id: Date.now().toString(),
            clientName: reviewForm.clientName!,
            businessName: reviewForm.businessName || '',
            content: reviewForm.content!,
            rating: reviewForm.rating || 5
        });
        setIsReviewModalOpen(false);
        setReviewForm({ clientName: '', businessName: '', content: '', rating: 5 });
        // Jump to the new review (which is at the end)
        setCurrentTestimonialIndex(data.testimonials.length); 
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 dark:opacity-40">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-light filter blur-[100px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-surface filter blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full bg-brand-surface/20 border border-brand-light/20 text-brand-light text-sm font-medium mb-6 backdrop-blur-sm">
              Shopify Theme Experts
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-dark dark:text-white mb-6 leading-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-accent">Shopify Store</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              Expert customization for Impulse, Impact, and Dawn themes. We turn generic stores into high-converting brand experiences.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={WHATSAPP_LINK}
                target="_blank" 
                rel="noreferrer"
                className="px-8 py-4 bg-brand-light text-brand-dark rounded-full font-bold text-lg hover:bg-white transition-all shadow-lg hover:shadow-brand-light/50 flex items-center justify-center gap-2"
              >
                Message Me on WhatsApp <ArrowRight size={20} />
              </a>
              <Link 
                to="/portfolio"
                className="px-8 py-4 bg-transparent border border-gray-300 dark:border-white/20 text-brand-dark dark:text-white rounded-full font-bold text-lg hover:bg-brand-surface/10 transition-all flex items-center justify-center"
              >
                View Portfolio
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark dark:text-white mb-4">What I Offer</h2>
            <p className="text-gray-600 dark:text-gray-400">Specialized services for serious e-commerce brands</p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.services.slice(0, 4).map((service) => (
              <div key={service.id} className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-brand-light/50 transition-colors group">
                <div className="w-12 h-12 rounded-lg bg-brand-surface/20 text-brand-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </StaggerContainer>
          <div className="text-center mt-12">
            <Link to="/services" className="text-brand-light font-semibold hover:underline flex items-center justify-center gap-1">
                View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Selected Works (Featured Portfolio) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
               <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark dark:text-white mb-2">Selected Works</h2>
               <p className="text-gray-600 dark:text-gray-400">Shopify stores I have customised</p>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-brand-light hover:text-white transition-colors">
              See All <ArrowRight size={20} />
            </Link>
          </div>
          
          {displayProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayProjects.map((project) => (
                <FadeIn key={project.id} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <div className="aspect-[4/3] w-full flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {(project.images && project.images.length > 0 ? project.images : [project.imageUrl]).map((img, idx) => (
                         <img
                            key={idx}
                            src={img}
                            alt={`${project.title} ${idx + 1}`}
                            className="w-full h-full object-cover flex-shrink-0 snap-center"
                         />
                      ))}
                  </div>
                  
                  {/* Slide Indicators */}
                  {project.images && project.images.length > 1 && (
                     <div className="absolute top-4 right-4 flex gap-1 z-20 pointer-events-none">
                        {project.images.map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70 backdrop-blur-sm shadow-sm" />
                        ))}
                     </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                    <span className="text-brand-light text-xs font-bold uppercase tracking-wider mb-2">{project.shopifyTheme} Theme</span>
                    <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                <p className="text-gray-500">No works selected for display yet.</p>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-brand-light hover:text-white transition-colors font-semibold">
              See All Projects <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-brand-surface/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark dark:text-white mb-4">Transparent Pricing</h2>
                <p className="text-gray-600 dark:text-gray-400">Choose the package that fits your needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.plans.map((plan) => (
                    <div key={plan.id} className={`relative p-8 rounded-2xl border ${plan.recommended ? 'border-brand-light bg-brand-light/5' : 'border-gray-200 dark:border-white/10 bg-white dark:bg-white/5'}`}>
                        {plan.recommended && (
                            <span className="absolute top-0 right-0 bg-brand-light text-brand-dark text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                POPULAR
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">{plan.name}</h3>
                        <div className="text-4xl font-display font-bold text-brand-dark dark:text-brand-light mb-6">{plan.price}</div>
                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <CheckCircle size={18} className="text-brand-light shrink-0 mt-0.5" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a 
                            href={`${WHATSAPP_LINK}?text=Hi, I am interested in the ${plan.name}`}
                            target="_blank"
                            rel="noreferrer"
                            className={`w-full block text-center py-3 rounded-xl font-bold transition-colors ${
                                plan.recommended 
                                ? 'bg-brand-light text-brand-dark hover:bg-white' 
                                : 'bg-brand-dark dark:bg-white text-white dark:text-brand-dark hover:opacity-90'
                            }`}
                        >
                            Get Started
                        </a>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials Slideshow */}
      <section className="py-20 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
               <div>
                 <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark dark:text-white mb-2 text-center md:text-left">Client Feedback</h2>
                 <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">Trusted by e-commerce businesses worldwide</p>
               </div>
               <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all text-sm font-bold text-brand-dark dark:text-white"
               >
                 <MessageSquarePlus size={18} /> Leave a Review
               </button>
            </div>
            
            <div className="relative min-h-[300px]">
                {data.testimonials.length > 0 ? (
                    <div className="relative overflow-hidden p-4">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentTestimonialIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="w-full"
                            >
                                <div className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-gray-100 dark:border-white/10 text-center shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-light to-transparent opacity-50"></div>
                                    <div className="flex justify-center gap-1 mb-6 text-brand-light">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={24} 
                                                fill={i < data.testimonials[currentTestimonialIndex].rating ? "currentColor" : "none"} 
                                                className={i < data.testimonials[currentTestimonialIndex].rating ? "text-brand-light" : "text-gray-600"}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 italic leading-relaxed font-display">
                                        "{data.testimonials[currentTestimonialIndex].content}"
                                    </p>
                                    <div>
                                        <div className="font-bold text-lg text-brand-dark dark:text-white">
                                            {data.testimonials[currentTestimonialIndex].clientName}
                                        </div>
                                        <div className="text-sm font-semibold text-brand-accent uppercase tracking-widest mt-1">
                                            {data.testimonials[currentTestimonialIndex].businessName}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between pointer-events-none px-0 md:px-0">
                            <button 
                                onClick={handlePrev}
                                className="pointer-events-auto w-12 h-12 rounded-full bg-brand-dark/50 hover:bg-brand-light/20 backdrop-blur-sm text-white flex items-center justify-center transition-all transform hover:scale-110 -ml-4 md:-ml-12 border border-white/10"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button 
                                onClick={handleNext}
                                className="pointer-events-auto w-12 h-12 rounded-full bg-brand-dark/50 hover:bg-brand-light/20 backdrop-blur-sm text-white flex items-center justify-center transition-all transform hover:scale-110 -mr-4 md:-mr-12 border border-white/10"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                        
                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {data.testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentTestimonialIndex ? 1 : -1);
                                        setCurrentTestimonialIndex(idx);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentTestimonialIndex ? 'w-8 bg-brand-light' : 'bg-gray-600 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-500">No testimonials yet. Be the first to review!</p>
                    </div>
                )}
            </div>
          </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsReviewModalOpen(false)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-[#2a2145] border border-white/10 p-8 rounded-3xl shadow-2xl"
                >
                    <button 
                        onClick={() => setIsReviewModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                    
                    <h3 className="text-2xl font-display font-bold text-white mb-2 text-center">Share Your Experience</h3>
                    <p className="text-gray-400 text-center mb-6 text-sm">Your feedback helps me improve and helps others choose.</p>
                    
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star 
                                            size={32} 
                                            fill={star <= (reviewForm.rating || 0) ? "#E0B1CB" : "none"} 
                                            className={star <= (reviewForm.rating || 0) ? "text-brand-light" : "text-gray-600"}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white focus:border-brand-light outline-none"
                                    value={reviewForm.clientName}
                                    onChange={(e) => setReviewForm({...reviewForm, clientName: e.target.value})}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Business (Optional)</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white focus:border-brand-light outline-none"
                                    value={reviewForm.businessName}
                                    onChange={(e) => setReviewForm({...reviewForm, businessName: e.target.value})}
                                    placeholder="Company Ltd."
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Your Review</label>
                            <textarea 
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white focus:border-brand-light outline-none"
                                value={reviewForm.content}
                                onChange={(e) => setReviewForm({...reviewForm, content: e.target.value})}
                                placeholder="How was working with StarterKart?"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full py-4 mt-2 bg-brand-light text-brand-dark font-bold rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-brand-light/30 flex items-center justify-center gap-2"
                        >
                            <MessageSquarePlus size={20} /> Submit Review
                        </button>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};