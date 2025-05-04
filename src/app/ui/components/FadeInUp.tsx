"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeInUpProps {
  children: React.ReactNode;
  duration?: number;
}

const FadeInUp: React.FC<FadeInUpProps> = ({ children, duration = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;