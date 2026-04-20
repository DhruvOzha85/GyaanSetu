import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, CheckCircle } from 'lucide-react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import ThemeToggle from '../ui/ThemeToggle';

const AuthLayout = () => {
  const testimonials = [
    {
      text: "GyaanSetu changed my life. Learning MERN in Hindi made everything click for the first time.",
      author: "Rahul S., Indore"
    },
    {
      text: "The browser labs are like magic. I didn't need a heavy laptop to learn backend development.",
      author: "Priya V., Bhuj"
    }
  ];

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950">
      {/* Left Pane: Branding & Social Proof (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-7/12 relative bg-slate-950 overflow-hidden items-center justify-center p-12">
        {/* Animated Background Patterns (Saffron Glow) */}
        <div className="absolute inset-0 opacity-20 py-12 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-xl text-white">
          <Link to="/" className="inline-flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl">
              G
            </div>
            <span className="text-3xl font-black tracking-tighter">GyaanSetu</span>
          </Link>

          <h2 className="text-5xl font-black leading-tight mb-8 text-white">
            The Bridge to Your <br />
            <span className="text-primary italic underline underline-offset-8 decoration-white decoration-wavy">Dream Tech Career.</span>
          </h2>

          <div className="space-y-6 mb-12">
            {[
              "Bilingual Practical Learning",
              "Industrial Browser Labs",
              "98% Placement Rate",
              "Community of 10,000+ Scholars"
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-3 text-lg font-bold text-slate-200">
                <CheckCircle className="text-primary" size={24} />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Oscillating Testimonial */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 min-h-[160px] relative">
            <Quote size={40} className="absolute -top-4 -left-4 text-white opacity-20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <p className="text-xl font-medium italic">&ldquo;{testimonials[index].text}&rdquo;</p>
                <div className="h-px w-8 bg-white/30" />
                <p className="text-sm font-black uppercase tracking-widest opacity-80">{testimonials[index].author}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Accent Debris */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-slate-900 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Right Pane: Authentication Forms */}
      <div className="w-full lg:w-5/12 flex flex-col p-6 md:p-12">
        <div className="flex items-center justify-between mb-12">
          {/* Logo for mobile */}
          <Link to="/" className="lg:hidden flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-black text-lg">G</div>
            <span className="font-black tracking-tighter text-slate-900 dark:text-white">GyaanSetu</span>
          </Link>

          <div className="flex items-center space-x-4 ml-auto">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-8 md:py-12 px-4">
          <Outlet />
        </div>

        <footer className="mt-auto pt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} GyaanSetu Labs. Built for Bharat.
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
