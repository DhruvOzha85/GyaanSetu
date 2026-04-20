import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCourses } from '../data/mockData';
import CourseCard from '../../../../components/ui/CourseCard';
import Button from '../../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { cn } from '../../../../utils/cn';

const SectionF_FeaturedCourses = () => {
  const [filter, setFilter] = useState('All');
  
  const tabs = ['All', 'Hindi', 'Gujarati', 'English'];
  
  const filteredCourses = filter === 'All' 
    ? mockCourses 
    : mockCourses.filter(c => c.language === filter);

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
              Popular Courses
            </h2>
            <p className="text-slate-500 font-medium max-w-xl">
              Hand-picked courses from industry experts, tailored for conceptual clarity and practical execution.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={cn(
                  'px-6 py-2 rounded-xl text-sm font-black transition-all whitespace-nowrap',
                  filter === tab 
                    ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.slice(0, 8).map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <Link to="/courses">
            <Button variant="outline" size="lg">Browse All Courses →</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SectionF_FeaturedCourses;
