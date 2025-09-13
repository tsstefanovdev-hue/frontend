import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useTranslation();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-primary text-primary-content border-t border-secondary  pb-10">
      <motion.div
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-6 md:py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Left: Logo & Contacts */}
        <motion.div
          className="flex flex-col gap-2 md:gap-3 text-center md:text-left"
          variants={fadeUp}
        >
          <h2 className="">{t("navbar.logo")}</h2>
          <p className="text-sm md:text-lg">{t("footer.slogan")}</p>
          <p className="text-sm md:text-lg">
            {t("footer.phone.note")}{" "}
            <a href={`tel:${t("footer.phone.value")}`} className="underline">
              {t("footer.phone.value")}
            </a>
          </p>
          <p className="text-sm md:text-lg">
            {t("footer.email.note")}{" "}
            <a
              href={`mailto:${t("footer.email.value1")}@${t("footer.email.value2")}.com`}
              className="underline"
            >
              {t("footer.email.value1")}@{t("footer.email.value2")}.com
            </a>
          </p>
        </motion.div>

        {/* Center: Socials */}
        <motion.div
          className="flex flex-col items-center gap-2 md:gap-3"
          variants={fadeUp}
        >
          <div className="flex gap-3 md:gap-4 mt-1 md:mt-2">
            {[t("footer.social-links.linkedin"), "#", "#"].map((link, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, color: "#FBBF24" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="transition-colors"
              >
                {i === 0 ? <FaLinkedinIn size={30} /> : i === 1 ? <FaFacebookF size={30} /> : <FaTwitter size={30} />}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: Quick Nav */}
        <motion.div
          className="flex flex-col items-center md:items-end gap-1 md:gap-2 text-sm md:text-lg font-bold"
          variants={fadeUp}
        >
          {["#hero", "#products", "#about", "#contacts"].map((href, i) => (
            <motion.a
              key={i}
              href={href}
              whileHover={{ x: 5, color: "#FBBF24" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:underline"
            >
              {i === 0 ? t("navbar.home") : i === 1 ? t("navbar.products") : i === 2 ? t("navbar.about") : t("navbar.contacts")}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        className="text-center text-sm md:text-lg pt-4 border-t border-secondary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        © 2025 <span className="font-bold">Trayan Stefanov</span>. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
