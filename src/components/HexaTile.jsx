import { motion } from "framer-motion";

const fadeInDelayed = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const HexaTile = ({ image, title, paragraphs, className = "" }) => (
  <motion.div
    variants={fadeInDelayed}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className={`relative flex flex-col items-center justify-center text-center ${className}`}
  >
    {/* Hex background */}
    <img
      src={image}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
    />

    {/* Text content inside hex */}
    <div className="relative z-10 flex flex-col items-center justify-center px-6 py-4">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-accent mb-3">
        {title}
      </h3>
      <div className="text-sm md:text-base leading-relaxed space-y-3 text-primary max-w-prose">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  </motion.div>
);

export default HexaTile;
