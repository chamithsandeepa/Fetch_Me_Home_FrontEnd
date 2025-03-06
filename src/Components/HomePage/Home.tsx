import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { data } from "../../types/data";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  const handleExplore = () => navigate("/about");
  const handleStartJourney = () => navigate("/blogs");

  const handlePrev = () => {
    setActiveImg((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImg((prev) => (prev + 1) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [activeImg]);

  // Intersection Observer for animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleBoxes((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.5 }
    );

    const boxes = document.querySelectorAll(".stat-box");
    boxes.forEach((box) => observer.observe(box));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) titleObserver.observe(titleRef.current);

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-b from-purple-100 to-blue-100">
      {/* Carousel Hero Section */}
      <div className="relative w-full h-[90vh] overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-5 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-4 rounded-full z-20 shadow-lg hover:bg-white/50 transition-all ease-in-out duration-300 hover:scale-110"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="relative w-full h-full">
          {data.map((item, i) => (
            <div
              key={item.id}
              className={`absolute w-full h-full transition-all duration-1000 ease-in-out ${
                i === activeImg
                  ? "opacity-100 z-10 scale-100"
                  : "opacity-0 z-0 scale-95"
              }`}
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-8">
                <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg animate-fadeInUp">
                  {item.title}
                </h1>
                <p className="text-2xl mt-4 font-light animate-fadeInUp delay-200">
                  {item.subtitle}
                </p>
                <button
                  onClick={handleExplore}
                  className="mt-6 px-10 py-4 bg-teal-600 text-white text-xl rounded-full shadow-lg hover:bg-teal-700 transition-all ease-in-out duration-300 hover:scale-105"
                >
                  Explore Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-5 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-4 rounded-full z-20 shadow-lg hover:bg-white/50 transition-all ease-in-out duration-300 hover:scale-110"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Statistics Section */}
      <div className="py-16 px-10 bg-gradient-to-br from-teal-50 to-white text-center">
        {/* Jumping "Our Impact" Heading on Scroll */}
        <h2
          ref={titleRef}
          className={`text-5xl font-bold text-teal-900 mb-10 transition-all duration-700 ${
            titleVisible
              ? "translate-y-0 opacity-100 animate-bounce-once"
              : "translate-y-5 opacity-0"
          }`}
        >
          Our Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { number: "1,200+", label: "Happy Adoptions" },
            { number: "800+", label: "Caring Families" },
            { number: "5,000+", label: "Volunteers" },
          ].map((stat, index) => (
            <div
              key={index}
              data-index={index}
              className={`stat-box bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-700 ${
                visibleBoxes.includes(index)
                  ? "translate-y-0 opacity-100 animate-bounce-once"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <div className="text-5xl font-extrabold text-teal-700">
                {stat.number}
              </div>
              <div className="text-xl text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-900 text-white text-center py-20 px-10 my-14 max-w-7xl mx-auto rounded-3xl shadow-2xl transition-all duration-500 animate-fadeIn">
        <h2 className="text-5xl font-bold mb-5 animate-fadeInUp">
          Ready to Find Your New Best Friend?
        </h2>
        <p className="text-2xl mb-8 animate-fadeInUp delay-200">
          Join our community and make a difference today!
        </p>
        <button
          onClick={handleStartJourney}
          className="px-10 py-4 bg-white text-teal-900 text-xl rounded-full shadow-xl hover:bg-gray-200 transition-all ease-in-out duration-300 hover:scale-105"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default Home;
