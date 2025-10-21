import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaBoxOpen, FaChartBar } from "react-icons/fa";

/* import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../stores/useProductStore"; */

const tabs = [
  { id: "create", label: "Create Product", icon: <FaPlusCircle /> },
  { id: "products", label: "Products", icon: <FaBoxOpen /> },
  { id: "analytics", label: "Analytics", icon: <FaChartBar /> },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  /* const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]); */

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-secondary/80 via-secondary/40 to-secondary/80 p-8">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-bold text-emerald-400 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-colors ${
              activeTab === tab.id
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-400/50"
                : "bg-primary/90 text-primary-content hover:bg-primary/80"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full max-w-6xl bg-primary/80 border-4 border-accent rounded-2xl p-8 shadow-xl">
        {/* {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />} */}
      </div>
    </div>
  );
};

export default AdminPage;
