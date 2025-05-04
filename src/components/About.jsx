// AboutSection.js
import AnimatedSection from "../components/AnimatedSection";
import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "300+", label: "Happy Customers" },
    { value: "16/6", label: "Support" },
  ];

  return (
    <AnimatedSection className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-gray-600 mb-4">
              SP Electro has been at the forefront of transforming the
              automotive industry in Solapur. Our mission is to lead the charge
              towards a sustainable future by providing top-quality electric
              vehicles and promoting energy-efficient solutions.
            </p>
            <p className="text-gray-600 mb-6">
              Our team of experts is dedicated to helping customers. At SP
              Electro, keeping the Mehta&apos;s legacy we provide exceptional
              service and support to ensure you have the best possible
              experience with your electric vehicle.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <h4 className="text-2xl font-bold text-blue-600">
                    {stat.value}
                  </h4>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="h-64 sm:h-96 rounded-lg overflow-hidden">
            <img
              src="/images/EV_store.jpg"
              alt="SP Electro Showroom"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
