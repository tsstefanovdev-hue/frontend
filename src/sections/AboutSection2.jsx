import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TriangleTile from "../components/TriangleTile.jsx";
import BadgeTile from "../components/BadgeTile.jsx";
import HexaTile from "../components/HexaTile.jsx";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutSection = () => {
  const { t } = useTranslation();
  const intro = t("about.intro", { returnObjects: true });
  const tiles = intro.tiles;

  return (
    <section
      id="about"
      className="w-full py-12 lg:py-20 px-4 mx-auto max-w-7xl text-center"
    >
      {/* Title */}
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-accent mb-2"
      >
        {intro.title}
      </motion.h2>
      <div className="w-1/4 h-[3px] bg-accent mx-auto rounded-full mb-12"></div>

      {/* GRID LAYOUT */}
      <div className="grid grid-areas-about gap-6 items-center justify-items-center w-full mx-auto">
        <TriangleTile className="area-top-left max-w-[200px] aspect-[1/1]"
          image={tiles.triangle["1"].image}
          title={tiles.triangle["1"].title}
        />
        <BadgeTile className="area-bottom-left max-w-[220px] aspect-[4/5]"
          image={tiles.badge["1"].image}
          text={tiles.badge["1"].text}
        />
        <HexaTile className="area-center max-w-[400px] aspect-[1/1]"
          image={tiles.hexa.image}
          title={tiles.hexa.title}
          paragraphs={tiles.hexa.text}
        />
        <TriangleTile
          className="area-top-right max-w-[200px] aspect-[1/1]"
          image={tiles.triangle["2"].image}
          title={tiles.triangle["2"].title}
        />
        <BadgeTile
          className="area-bottom-right max-w-[220px] aspect-[4/5]"
          image={tiles.badge["2"].image}
          text={tiles.badge["2"].text}
        />
      </div>
    </section>
  );
};

export default AboutSection;
