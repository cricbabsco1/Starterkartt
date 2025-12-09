import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FadeIn } from '../components/Animation';
import { ContactSubmission } from '../types';
import { WHATSAPP_LINK } from '../constants';
import { Send, Phone } from 'lucide-react';

export const Contact: React.FC = () => {
  const { addInquiry } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    theme: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInquiry: ContactSubmission = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString()
    };
    addInquiry(newInquiry);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-brand-surface/20 p-8 rounded-3xl text-center border border-brand-light/20 backdrop-blur-md">
          <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6 text-brand-dark">
            <Send size={32} />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-gray-300 mb-8">
            Thank you for reaching out. I'll review your {formData.theme} theme requirements and get back to you shortly.
          </p>
          <a 
            href={`${WHATSAPP_LINK}?text=Hi, I just submitted a form for my ${formData.theme} store. My name is ${formData.name}.`}
            target="_blank"
            rel="noreferrer"
            className="block w-full py-4 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Phone size={20} /> Continue to WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-brand-dark dark:text-white mb-4">Let's Enhance Your Store</h1>
            <p className="text-gray-600 dark:text-gray-400">Fill out the form below. Please mention which Shopify theme you are currently using.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-brand-dark dark:text-white focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-brand-dark dark:text-white focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shopify Theme Link / Name <span className="text-brand-light">*Required</span></label>
                <input
                  type="text"
                  name="theme"
                  id="theme"
                  required
                  value={formData.theme}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-brand-dark dark:text-white focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Impact, Impulse, Dawn, or Store URL"
                />
                <p className="mt-1 text-xs text-gray-500">I need this to check code compatibility.</p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Details</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-brand-dark dark:text-white focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all"
                  placeholder="Describe what you need: Custom sections, speed optimization, etc."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-light text-brand-dark font-bold rounded-xl hover:bg-white transition-colors shadow-lg hover:shadow-brand-light/30"
              >
                Send Request
              </button>
            </div>
          </form>
        </FadeIn>
      </div>
    </div>
  );
};