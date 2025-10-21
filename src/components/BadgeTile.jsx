import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BadgeTile = ({ image, text, className = "" }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6 }}
    className={`relative flex items-center justify-center text-center ${className}`}
  >
    {/* Decorative shape */}
    <img
      src={image}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
    />

    {/* Text overlay */}
    <div className="relative z-10 max-w-[80%]">
      <p className="text-sm md:text-base lg:text-lg font-medium text-primary leading-snug">
        {text}
      </p>
    </div>
  </motion.div>
);

export default BadgeTile;
