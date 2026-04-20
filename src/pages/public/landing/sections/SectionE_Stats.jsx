import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Users, FlaskConical, Globe, Star } from 'lucide-react';
import PropTypes from 'prop-types';

const StatCounter = ({ end, duration = 2, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const endNum = parseInt(end.replace(/[,+]/g, ''));
      const increment = endNum / (duration * 60);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= endNum) {
          setCount(endNum);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

StatCounter.propTypes = {
  end: PropTypes.string.isRequired,
  duration: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
};


const SectionE_Stats = () => {
  const stats = [
    { label: 'Students Enrolled', value: '10,000+', icon: Users },
    { label: 'Hands-On Labs', value: '200+', icon: FlaskConical },
    { label: 'Regional Languages', value: '5', icon: Globe },
    { label: 'Practical Skill Rating', value: '95', suffix: '%', icon: Star },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center text-white">
              <div className="mb-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                <stat.icon size={28} />
              </div>
              <h3 className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                <StatCounter 
                  end={stat.value.replace('%', '')} 
                  suffix={stat.value.includes('+') ? '+' : (stat.suffix || '')} 
                />
              </h3>
              <p className="text-xs md:text-sm font-black uppercase tracking-widest opacity-80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionE_Stats;
