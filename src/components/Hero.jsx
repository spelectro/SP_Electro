// HeroSection.js
import { motion } from "framer-motion";
// import { useState } from "react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white ">
      <img
        className="  absolute inset-0 w-full h-full object-cover "
        src="public/images/Rizta-simran.webp"
        alt=""
      />

      <div className=" mt-8 relative max-w-screen-xl mx-auto px-4 py-32 lg:flex lg:h-screen lg:items-center z-10  ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="ml-28 mt-[-480px] max-w-3xl text-left"
        >
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold sm:text-5xl mb-6">
            Welcome to SP Electro <br /> The Future of <br /> Driving
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Discover our range of electric vehicles <br /> and sustainable
            solutions
          </p>
          <div className="mt-8 ml-[-150px] flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/vehicles"
              className="block w-full sm:w-auto rounded bg-white px-12 py-3 text-sm font-medium text-black border border-white  focus:outline-none focus:ring active:text-opacity-75"
            >
              Explore Vehicles
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/appointment"
              className="block w-full sm:w-auto rounded border-2 bg-black bg-opacity-45 px-12 py-3 text-sm font-medium  focus:outline-none focus:ring active:bg-blue-500"
            >
              Book Test Drive
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Marquee
      <div className="bg-white py-4 overflow-hidden border-dashed border-y-2 border-gray-200 z-10 relative">
        <motion.div
          className="flex space-x-6 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 80, // Adjusted for slower scroll
            repeat: Infinity,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index + testimonials.length} {...testimonial} />
          ))}
        </motion.div>
      </div> */}
    </section>
  );
}

// // Testimonial component with expand/collapse functionality
// // eslint-disable-next-line react/prop-types
// const Testimonial = ({ name, comment, avatar }) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <div
//       onClick={() => setExpanded(!expanded)}
//       className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
//         expanded
//           ? "bg-blue-100 shadow-lg w-full py-6 pr-16"
//           : "bg-white w-64 h-24 py-4"
//       } mx-4 space-x-4`}
//     >
//       <img
//         src={avatar}
//         alt={name}
//         className="w-12 h-12 rounded-full object-cover"
//       />
//       <div className="flex flex-col">
//         <p className="text-gray-800 font-semibold">{name}</p>
//         <p
//           className={`text-gray-600 text-sm transition-all duration-300 ease-in-out ${
//             expanded ? "line-clamp-none" : "truncate"
//           }`}
//         >
//           {comment}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Dummy testimonials data
// const testimonials = [
//   {
//     name: "Sanskar K",
//     comment: "Excellent service and great quality! Highly recommended.",
//     avatar: "/images/Sanskar.png",
//   },
//   {
//     name: "Gururak K",
//     comment:
//       "Loved the range of vehicles offered. Very satisfied with the quality.",
//     avatar: "/images/Gururaj.jpg",
//   },
//   {
//     name: "Yash N",
//     comment: "Friendly staff and affordable prices. Great experience overall!",
//     avatar: "/images/Yash.png",
//   },
//   {
//     name: "Simran M",
//     comment: "Highly recommended for EV enthusiasts! Very professional staff.",
//     avatar: "/images/Simran.png",
//   },
// ];
