import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// Import Modular Sections
import SectionA_Hero from './landing/sections/SectionA_Hero';
import SectionB_ProblemStatement from './landing/sections/SectionB_ProblemStatement';
import SectionC_Pillars from './landing/sections/SectionC_Pillars';
import SectionD_HowItWorks from './landing/sections/SectionD_HowItWorks';
import SectionE_Stats from './landing/sections/SectionE_Stats';
import SectionF_FeaturedCourses from './landing/sections/SectionF_FeaturedCourses';
import SectionG_LabPreview from './landing/sections/SectionG_LabPreview';
import SectionH_LanguageSupport from './landing/sections/SectionH_LanguageSupport';
import SectionI_Testimonials from './landing/sections/SectionI_Testimonials';
import SectionJ_Instructors from './landing/sections/SectionJ_Instructors';
import SectionK_CTA from './landing/sections/SectionK_CTA';

/**
 * Landing Page - The high-conversion home page for GyaanSetu.
 * Includes 13 specialized sections for marketing and bilingual identity.
 */
const Landing = () => {
  return (
    <div className="flex flex-col overflow-x-hidden pt-20">
      <Helmet>
        <title>GyaanSetu — Learn by Doing in Your Language | India&apos;s EdTech Platform</title>
        <meta 
          name="description" 
          content="India's first bilingual practical EdTech platform. Learn Coding, Data Science, and Design in Hindi, Gujarati, and English with browser-based labs." 
        />
        <meta property="og:title" content="GyaanSetu — Bridge the Skills Gap" />
        <meta property="og:description" content="Conceptual clarity meets practical industry labs in your native language." />
        <link rel="canonical" href="https://gyaansetu.in" />
      </Helmet>

      {/* Main Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SectionA_Hero />
        <SectionB_ProblemStatement />
        <SectionC_Pillars />
        <SectionD_HowItWorks />
        <SectionE_Stats />
        <SectionF_FeaturedCourses />
        <SectionG_LabPreview />
        <SectionH_LanguageSupport />
        <SectionI_Testimonials />
        <SectionJ_Instructors />
        <SectionK_CTA />
      </motion.div>
    </div>
  );
};

export default Landing;
