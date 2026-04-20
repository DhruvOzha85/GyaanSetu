import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = ({ 
  className, 
  children, 
  hoverable = false,
  glass = false,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hoverable ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        'rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 transition-shadow',
        glass && 'bg-white/70 backdrop-blur-xl dark:bg-slate-900/60',
        hoverable && 'hover:shadow-xl dark:hover:shadow-primary/5',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  hoverable: PropTypes.bool,
  glass: PropTypes.bool
};

export default Card;
