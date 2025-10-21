import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard.jsx";
import axios from "../lib/axios.js";

const ProductsSection = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const title = t("products.title");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        const backendProducts = res.data;

        const localizedProducts = backendProducts.map((p) => {
          const i18nData = t(`products.${p.name}`, { returnObjects: true });

          return {
            ...p,
            title: i18nData.title || p.name, // fallback if missing
            description: i18nData.description || p.description,
            ingredients: i18nData.ingredients || "",
            badge: i18nData.badge || "",
          };
        });

        setProducts(localizedProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [t]);

  return (
    <section id="products" className="py-4">
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-accent px-6 lg:px-0 my-2">
          {title}
        </h2>
        <div className="w-1/2 h-[3px] bg-accent mx-auto rounded-full"></div>
      </div>

      <motion.div
        className="container mx-auto flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {products.map((product, idx) => (
          <ProductCard
            key={product._id}
            product={product}
            reverse={idx % 2 === 1}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ProductsSection;
