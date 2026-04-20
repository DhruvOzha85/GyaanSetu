import React from 'react';
import PropTypes from 'prop-types';

/**
 * StubPage - A simple placeholder for pages under development
 */
const StubPage = ({ name }) => {
  return (
    <div className="p-8 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-12 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700">
        <h1 className="text-4xl font-extrabold text-primary mb-6">{name} Page</h1>
        <div className="h-1 w-24 bg-teal-500 rounded-full mb-8"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Welcome to the <span className="font-bold text-teal-600 dark:text-teal-400">{name}</span> module of GyaanSetu. 
          Our engineers are currently building this screen to provide you with the best practical learning experience.
        </p>
        <div className="flex items-center space-x-4 p-4 bg-orange-50 dark:bg-slate-900 rounded-lg">
          <div className="w-12 h-12 flex items-center justify-center bg-primary/20 text-primary rounded-full font-bold">
            🚧
          </div>
          <div>
            <h4 className="font-bold text-gray-800 dark:text-gray-100">Work in Progress</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">This feature will be available in Part 4-19 of the build plan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

StubPage.propTypes = {
  name: PropTypes.string.isRequired,
};

export default StubPage;
