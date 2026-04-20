import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate delay
    await new Promise(r => setTimeout(r, 1500));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight text-center lg:text-left">
                Lost Your <span className="text-primary italic">Key?</span>
              </h1>
              <p className="text-slate-500 font-medium text-center lg:text-left">
                No worries! Just enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Registered Email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-sm" 
                isLoading={isLoading}
                icon={Send}
              >
                Send Reset Link
              </Button>
            </form>

            <Link 
              to="/login" 
              className="flex items-center justify-center lg:justify-start space-x-2 text-sm font-black text-slate-400 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Sign In</span>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-8"
          >
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-emerald-100 dark:shadow-none">
                <CheckCircle size={48} strokeWidth={2.5} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">Check Your Inbox!</h3>
              <p className="text-slate-500 font-medium">
                We&apos;ve sent a password reset link to <br />
                <span className="text-slate-900 dark:text-slate-200 font-bold">{email}</span>
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-500 italic">
              Didn&apos;t receive it? Check your spam folder or try again in 5 minutes.
            </div>

            <div className="pt-4">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForgotPassword;
