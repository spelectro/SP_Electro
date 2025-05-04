// FeaturedModelsSection.js
import { motion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection";

const models = [
  { name: "Hindustan Power EV", price: 47999, image: "/images/EV_1.jpg" },
  { name: "2 Wheeler Loader", price: 87999, image: "/images/EV_2.jpg" },
  { name: "3 Wheeler Loader", price: 91999, image: "/images/3W Loader.jpg" },
];

export default function FeaturedModelsSection() {
  return (
    <AnimatedSection className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Models</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-48 sm:h-56 bg-gray-200 overflow-hidden">
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-600 mb-4">
                Starting from Rs {model.price.toLocaleString()}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={() => {
                  window.location.href = "/vehicles";
                }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}
