import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Eye, EyeOff, Heart } from 'lucide-react';

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
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#23242a] font-sans overflow-hidden relative">
      <style>{`
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .box {
            position: relative;
            width: 380px;
            height: 450px;
            background: #1c1c25;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 50px rgba(0,0,0,0.5);
        }

        .box::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 380px;
            height: 450px;
            background: linear-gradient(0deg, transparent, transparent, #45f3ff, #45f3ff, #45f3ff);
            z-index: 1;
            transform-origin: bottom right;
            animation: rotate 6s linear infinite;
        }

        .box::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 380px;
            height: 450px;
            background: linear-gradient(0deg, transparent, transparent, #E0B1CB, #E0B1CB, #E0B1CB);
            z-index: 1;
            transform-origin: bottom right;
            animation: rotate 6s linear infinite;
            animation-delay: -3s;
        }

        .form-content {
            position: absolute;
            inset: 2px;
            background: #28292d;
            border-radius: 8px;
            z-index: 2;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .form-content h2 {
            color: #45f3ff;
            font-weight: 600;
            text-align: center;
            letter-spacing: 0.1em;
            margin-bottom: 30px;
        }

        .input-group {
            position: relative;
            width: 100%;
            margin-top: 25px;
        }

        .input-group input {
            position: relative;
            width: 100%;
            padding: 10px;
            background: transparent;
            border: none;
            outline: none;
            box-shadow: none;
            color: #fff;
            font-size: 1em;
            letter-spacing: 0.05em;
            z-index: 10;
        }

        .input-group span {
            position: absolute;
            left: 0;
            padding: 10px;
            pointer-events: none;
            font-size: 1em;
            color: #8f8f8f;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: 0.5s;
        }

        .input-group input:valid ~ span,
        .input-group input:focus ~ span {
            color: #45f3ff;
            transform: translateX(0px) translateY(-30px);
            font-size: 0.75em;
        }
        
        /* The border line */
        .input-group i {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2px;
            background: #fff;
            border-radius: 4px;
            overflow: hidden;
            transition: 0.5s;
            pointer-events: none;
        }

        .input-group input:valid ~ i,
        .input-group input:focus ~ i {
            height: 40px; /* Expands to fill background optionally, or just change color */
            background: #45f3ff;
            box-shadow: 0 0 10px #45f3ff;
        }
        
        /* To keep the line style but just colored: */
        .input-group input:valid ~ i,
        .input-group input:focus ~ i {
            height: 44px; /* Matches input height to create a filled effect border or just underline */
            background: transparent;
            border: 1px solid #45f3ff;
            border-radius: 4px;
        }
        
        /* Simpler line style logic from reference */
        .border-line {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background: #fff;
            transition: 0.5s;
        }
        
        .input-group input:focus ~ .border-line,
        .input-group input:valid ~ .border-line {
            height: 100%;
            background: transparent;
            border: 1px solid #45f3ff;
            border-radius: 4px;
        }

        .submit-btn {
            background: #45f3ff;
            color: #1c1c25;
            border: none;
            cursor: pointer;
            box-shadow: 0 0 10px #45f3ff;
            transition: 0.3s;
            font-weight: 700;
        }
        
        .submit-btn:hover {
            box-shadow: 0 0 25px #45f3ff;
            transform: scale(1.02);
        }

        .links a:hover {
            color: #45f3ff;
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#45f3ff] rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E0B1CB] rounded-full blur-[150px] opacity-20"></div>
      </div>

      <div className="box">
        <div className="form-content">
            <h2 className="flex items-center justify-center gap-2">
                LOGIN <Heart size={20} className="animate-pulse" fill="#45f3ff" stroke="none" />
            </h2>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-2">
                <div className="input-group">
                    <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                    <span>Username</span>
                    <i className="border-line"></i>
                </div>
                
                <div className="input-group">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>Password</span>
                    <i className="border-line"></i>
                    
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-3 text-gray-500 hover:text-white transition-colors z-20"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>

                {error && (
                    <div className="text-red-400 text-xs text-center font-medium mt-4">
                        {error}
                    </div>
                )}

                <div className="flex justify-between items-center mt-6 mb-6 text-xs text-[#8f8f8f] links">
                    <Link to="/forgot-password" className="hover:text-[#E0B1CB] transition-colors">Forgot Password</Link>
                    <Link to="/" className="hover:text-[#E0B1CB] transition-colors">Signup</Link>
                </div>

                <button type="submit" className="submit-btn w-full py-3 rounded-md uppercase tracking-wider text-sm">
                    Sign In
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};