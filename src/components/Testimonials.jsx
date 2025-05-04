import { useState, useEffect } from "react";

const testimonials = [
  {
    rating: 4.9,
    review:
      "Great experience with SP Electro! Highly recommended for EV enthusiasts. ",
    name: "Gururaj Kulkarni",
    title: "Happy Customer",
    avatar: "/images/Gururaj.jpg",
  },
  {
    rating: 4.9,
    review:
      "Thanks to SP Electro, I feel more informed and confident about my investment in electric vehicles.",
    name: "Sanskar Kunnurkar",
    title: "Excited Customer",
    avatar: "/images/Sanskar.png",
  },
  {
    rating: 4.9,
    review:
      "SP Electro Best EV Store in Solapur and I am very happy with their service.",
    name: "Yash Nagarkar",
    title: "Best Customer",
    avatar: "/images/Yash.png",
  },
  {
    rating: 4.9,
    review:
      "Best Experience Ever !",
    name: "Simran Meheta ",
    title: "Happy Customer",
    avatar: "/images/Simran.png",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 7000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="text-sm text-gray-500 font-medium mb-2 block">
            TESTIMONIAL
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            What our happy user says!
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 mx-auto p-4"
              >
                <div className="group bg-white border border-gray-300 rounded-xl p-6 transition-all duration-500 hover:border-indigo-600 hover:shadow-md">
                  <div>
                    <div className="flex items-center mb-7 gap-2 text-amber-500">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-base font-semibold text-indigo-600">
                        {testimonial.rating}
                      </span>
                    </div>
                    <p className="text-base text-gray-600 leading-6 pb-8 group-hover:text-gray-800">
                      {testimonial.review}
                    </p>
                  </div>
                  <div className="flex items-center gap-5 border-t border-gray-200 pt-5">
                    <img
                      className="rounded-full h-10 w-10 object-cover"
                      src={testimonial.avatar}
                      alt="avatar"
                    />
                    <div>
                      <h5 className="text-gray-900 font-medium mb-1">
                        {testimonial.name}
                      </h5>
                      <span className="text-sm text-gray-500">
                        {testimonial.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${
                currentIndex === index
                  ? "bg-indigo-600"
                  : "bg-gray-300 hover:bg-indigo-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
