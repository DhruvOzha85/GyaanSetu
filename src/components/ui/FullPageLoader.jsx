import React from 'react';

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-colors">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-orange-100 dark:border-slate-800 border-t-primary rounded-full animate-spin"></div>
        {/* Inner static Logo or Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
      <h2 className="mt-8 text-xl font-bold text-gray-700 dark:text-gray-200 animate-pulse">
        GyaanSetu
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">Loading your brilliance...</p>
    </div>
  );
};

export default FullPageLoader;
