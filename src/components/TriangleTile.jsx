import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TriangleTile = ({ image, title, className = "" }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.6 }}
    className={`relative flex items-center justify-center text-center ${className}`}
  >
    {/* Tile background image */}
    <img
      src={image}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
    />

    {/* Text overlay (inside tile) */}
    <div className="relative z-10 px-4 py-2">
      <span className="text-base md:text-lg lg:text-xl font-semibold text-primary drop-shadow-sm">
        {title}
      </span>
    </div>
  </motion.div>
);

export default TriangleTile;
