import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Globe } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setLoading } from '../../features/auth/authSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { LANGUAGES } from '../../utils/constants';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    language: 'hi' // Default to Hindi as per user profile preferences
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    let strength = 0;
    if (formData.password.length > 6) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[!@#$%^&*]/.test(formData.password)) strength += 1;
    return strength;
  };

  const strength = getPasswordStrength();

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    
    // Simulate delay
    await new Promise(r => setTimeout(r, 1500));

    const mockUser = {
      id: '2',
      name: formData.fullName,
      email: formData.email,
      role: 'student',
      language: formData.language
    };

    dispatch(setCredentials({ user: mockUser, token: 'mock-token-signup' }));
    dispatch(setLoading(false));
    navigate('/onboarding/language'); // Redirect to final language check/onboarding
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Join the <span className="text-secondary italic">Movement.</span>
        </h1>
        <p className="text-slate-500 font-medium tracking-tight">
          Start your journey towards practical tech excellence today.
        </p>
      </div>

      <button className="w-full h-12 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center space-x-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-slate-700 dark:text-slate-200 shadow-sm shadow-slate-100 dark:shadow-none">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
        <span>Join with Google</span>
      </button>

      <div className="flex items-center space-x-4">
        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or manually</span>
        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="E.g. Rahul Sharma"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          icon={User}
          required
        />

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
            placeholder="Min. 8 characters"
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

        {/* Strength Indicator */}
        {formData.password && (
          <div className="flex space-x-1 mt-1 px-1">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= strength 
                    ? strength <= 1 ? 'bg-rose-400' : strength <= 3 ? 'bg-amber-400' : 'bg-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`} 
              />
            ))}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Preferred Learning Language
          </label>
          <div className="relative">
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full h-12 rounded-2xl border-none bg-slate-50 dark:bg-slate-900 px-4 pl-10 text-sm font-bold text-slate-700 dark:text-slate-200 appearance-none focus:ring-2 focus:ring-secondary/20 transition-all"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
            <Globe size={18} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-500 text-xs font-bold border border-rose-100">
            {error}
          </div>
        )}

        <div className="pt-2">
          <Button 
            type="submit" 
            variant="secondary"
            className="w-full h-12 text-sm" 
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </div>
      </form>

      <p className="text-center text-sm font-bold text-slate-500">
        Already have an account?{' '}
        <Link 
          to="/login" 
          className="text-primary hover:underline underline-offset-4 decoration-2"
        >
          Sign In
        </Link>
      </p>

      <div className="pt-4 text-center">
        <p className="text-[10px] text-slate-400 font-medium px-4">
          By signing up, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
