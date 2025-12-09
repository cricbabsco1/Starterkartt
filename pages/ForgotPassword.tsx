import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for password reset
    if (email) {
      setTimeout(() => {
        setSubmitted(true);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-brand-dark">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-light/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-surface/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
            <Link to="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Login
            </Link>

            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-brand-surface/30 rounded-2xl flex items-center justify-center text-brand-light shadow-inner border border-white/5">
                  <KeyRound size={32} />
              </div>
            </div>
            
            {!submitted ? (
                <>
                    <h2 className="text-3xl font-display font-bold text-center text-white mb-2">Forgot Password?</h2>
                    <p className="text-center text-gray-400 mb-8">Enter your email address and we'll send you a link to reset your password.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                        <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@starterkart.com"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 mt-4 bg-brand-light text-brand-dark font-bold rounded-xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-brand-light/30 text-lg"
                    >
                        Send Reset Link
                    </button>
                    </form>
                </>
            ) : (
                <div className="text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-6 border border-green-500/30">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Check Your Inbox</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        If an account exists for <span className="text-white font-medium block mt-1">{email}</span> we have sent password reset instructions.
                    </p>
                    <Link 
                        to="/login"
                        className="block w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/5"
                    >
                        Return to Login
                    </Link>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};