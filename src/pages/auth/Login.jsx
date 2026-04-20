import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { setCredentials, setLoading, setError } from '../../features/auth/authSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful login
    const mockUser = {
      id: '1',
      name: 'Scholar Bharat',
      email: formData.email,
      role: 'student',
      avatar: 'https://i.pravatar.cc/150?u=bharat'
    };
    
    dispatch(setCredentials({ user: mockUser, token: 'mock-jwt-token' }));
    dispatch(setLoading(false));
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Welcome Back <span className="text-primary italic">Scholar!</span>
        </h1>
        <p className="text-slate-500 font-medium tracking-tight">
          Enter your credentials to access your labs and courses.
        </p>
      </div>

      {/* Google Login Section */}
      <button className="w-full h-12 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center space-x-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-700 dark:text-slate-200 shadow-sm shadow-slate-100 dark:shadow-none">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
        <span>Continue with Google</span>
      </button>

      <div className="flex items-center space-x-4">
        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or email</span>
        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          placeholder="name@example.com"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={Mail}
          required
        />
        
        <div className="relative">
          <Input
            label="Password"
            placeholder="••••••••"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[38px] text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary ring-offset-0" />
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
          </label>
          <Link 
            to="/forgot-password" 
            className="text-xs font-black text-primary hover:underline underline-offset-4 decoration-2"
          >
            Forgot Password?
          </Link>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 text-xs font-bold border border-rose-100 dark:border-rose-900/30"
          >
            {error}
          </motion.div>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 text-sm" 
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm font-bold text-slate-500">
        Don&apos;t have an account?{' '}
        <Link 
          to="/signup" 
          className="text-secondary hover:underline underline-offset-4 decoration-2"
        >
          Explore Courses & Signup
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
