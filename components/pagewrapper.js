'use client';
import React from 'react';
import { easeIn, motion } from 'framer-motion';

function PageWrapper({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
