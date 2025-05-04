import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// eslint-disable-next-line react/prop-types
export default function AnimatedSection({ children, className = '' }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {/* Assign the ref to an inner div to monitor visibility */}
      <div ref={ref}>
        {children}
      </div>
    </motion.div>
  );
}
