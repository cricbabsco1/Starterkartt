import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock, Eye, EyeOff } from 'lucide-react';

export const Login: React.FC = () => {
  const { loginAdmin } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'dawartariq14@gmail.com' && password === 'dawar123') {
      loginAdmin();
      navigate('/admin');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-brand-dark">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-light/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-surface/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
            <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-brand-surface/30 rounded-2xl flex items-center justify-center text-brand-light shadow-inner border border-white/5">
                <Lock size={32} />
            </div>
            </div>
            <h2 className="text-3xl font-display font-bold text-center text-white mb-2">Admin Portal</h2>
            <p className="text-center text-gray-400 mb-8">Secure access for StarterKart management</p>
            
            <form onSubmit={handleLogin} className="space-y-5">
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
            
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-600 focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-center flex items-center justify-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
                 {error}
                </div>
            )}

            <button 
                type="submit" 
                className="w-full py-4 mt-4 bg-brand-light text-brand-dark font-bold rounded-xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-brand-light/30 text-lg"
            >
                Access Dashboard
            </button>
            
            <div className="text-center mt-6">
                <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-brand-light transition-colors">
                    Forgot Password?
                </Link>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};