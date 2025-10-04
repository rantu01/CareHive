"use client";
import { useEffect, useState } from "react";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 3) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 3 + services.length) % services.length);
  };

  const visibleServices = services.slice(currentIndex, currentIndex + 3);

  const ServiceSkeleton = () => (
    <div className="relative group mb-6">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-20 animate-pulse"></div>
      <div
        className="relative p-6 rounded-xl h-full min-h-[140px]"
        style={{
          backgroundColor: "var(--dashboard-bg)",
          border: "1px solid var(--dashboard-border)",
        }}
      >
        <div className="flex items-start space-x-4">
          <div
            className="w-12 h-12 rounded-xl flex-shrink-0"
            style={{ backgroundColor: "var(--dashboard-bg)" }}
          ></div>
          <div className="flex-1 space-y-3">
            <div
              className="h-5 rounded w-3/4"
              style={{ backgroundColor: "var(--dashboard-bg)" }}
            ></div>
            <div
              className="h-3 rounded w-full"
              style={{ backgroundColor: "var(--dashboard-bg)" }}
            ></div>
            <div
              className="h-3 rounded w-2/3"
              style={{ backgroundColor: "var(--dashboard-bg)" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-5"
             style={{ backgroundColor: "var(--color-light-green)" }}></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-5"
             style={{ backgroundColor: "var(--color-calm-blue)" }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            style={{ color: "var(--fourground-color)" }}
          >
            Our{" "}
            <span 
              className="relative inline-block"
              style={{ color: "var(--color-calm-blue)" }}
            >
              Services
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 20"
              >
                <path
                  d="M10,10 C40,5 160,15 190,10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "var(--fourground-color)" }}
          >
            Comprehensive healthcare solutions tailored to your needs with expert care and advanced technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Services Cards */}
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="flex justify-end space-x-4 mb-6">
              <button
                onClick={prevService}
                disabled={isLoading || services.length <= 3}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--color-white)",
                  border: "2px solid var(--color-calm-blue)",
                  color: "var(--color-calm-blue)",
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextService}
                disabled={isLoading || services.length <= 3}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--color-calm-blue)",
                  color: "var(--color-white)",
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Services Cards */}
            <div className="space-y-6">
              {isLoading ? (
                [...Array(3)].map((_, i) => <ServiceSkeleton key={i} />)
              ) : (
                visibleServices.map((service, index) => (
                  <div
                    key={service._id || index}
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      activeService === index ? 'transform -translate-y-2' : ''
                    }`}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                  >
                    {/* Gradient Border */}
                    <div className={`absolute -inset-0.5 rounded-2xl blur transition-all duration-500 ${
                      activeService === index 
                        ? 'bg-gradient-to-r from-blue-400 to-green-400 opacity-70' 
                        : 'bg-gradient-to-r from-blue-200 to-green-200 opacity-30'
                    }`}></div>
                    
                    <div
                      className="relative p-6 rounded-2xl transition-all duration-500"
                      style={{
                        backgroundColor: "var(--dashboard-bg)",
                        border: "1px solid var(--dashboard-border)",
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Service Icon */}
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 rounded-xl overflow-hidden relative group-hover:rotate-3 transition-transform duration-500">
                            <img
                              src={service.image_url}
                              alt={service.service_name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-green-400/20 mix-blend-overlay"></div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3
                              className="text-xl font-bold pr-4 transition-colors duration-300 truncate"
                              style={{ 
                                color: activeService === index 
                                  ? "var(--color-calm-blue)" 
                                  : "var(--color-black)" 
                              }}
                            >
                              {service.service_name}
                            </h3>
                            
                            {/* Animated Arrow */}
                            <div className={`transform transition-transform duration-300 ${
                              activeService === index ? 'translate-x-1' : 'translate-x-0'
                            }`}>
                              <svg
                                className="w-5 h-5 flex-shrink-0"
                                style={{ color: "var(--color-calm-blue)" }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                ></path>
                              </svg>
                            </div>
                          </div>

                          <p
                            className="text-base mb-4 line-clamp-2 leading-relaxed"
                            style={{ color: "var(--fourground-color)" }}
                          >
                            {service.description}
                          </p>

                          {/* Specialties */}
                          <div className="flex flex-wrap gap-2">
                            {service.specialties?.slice(0, 2).map((specialty, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor: activeService === index 
                                    ? "var(--color-calm-blue)" 
                                    : "var(--color-light-green)/20",
                                  color: activeService === index 
                                    ? "var(--color-white)" 
                                    : "var(--color-calm-blue)",
                                }}
                              >
                                {specialty}
                              </span>
                            ))}
                            {service.specialties && service.specialties.length > 2 && (
                              <span
                                className="px-3 py-1 text-xs font-medium rounded-full"
                                style={{
                                  backgroundColor: "var(--dashboard-border)",
                                  color: "var(--fourground-color)",
                                }}
                              >
                                +{service.specialties.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View All Services Button */}
            <div className="text-center mt-8">
              <button
                className="px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl relative overflow-hidden group"
                style={{
                  color: "var(--color-white)",
                  background: "linear-gradient(135deg, var(--color-light-green), var(--color-calm-blue))",
                }}
              >
                <span className="relative z-10">View All Services</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                     style={{
                       background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                     }}></div>
              </button>
            </div>
          </div>

          {/* Right Side - Featured Image */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-green-400/10 z-10"></div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5"
                     style={{
                       backgroundImage: `radial-gradient(circle at 25px 25px, var(--color-calm-blue) 2%, transparent 0%), 
                                      radial-gradient(circle at 75px 75px, var(--color-light-green) 2%, transparent 0%)`,
                       backgroundSize: '100px 100px'
                     }}></div>

                {isLoading ? (
                  <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-3xl"></div>
                ) : (
                  <img
                    src={visibleServices[activeService]?.image_url || "/api/placeholder/600/600"}
                    alt={visibleServices[activeService]?.service_name || "Healthcare Service"}
                    className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                )}
                
                {/* Floating Info Card */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div
                    className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 transform hover:translate-y-[-5px]"
                    style={{
                      backgroundColor: "rgba(var(--dashboard-bg-rgb), 0.9)",
                      border: "1px solid var(--dashboard-border)",
                    }}
                  >
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: "var(--color-black)" }}
                    >
                      {visibleServices[activeService]?.service_name || "Premium Healthcare"}
                    </h3>
                    <p
                      className="text-base mb-4 line-clamp-2"
                      style={{ color: "var(--fourground-color)" }}
                    >
                      {visibleServices[activeService]?.description || "Experience world-class healthcare services with our expert team."}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span
                        className="px-4 py-2 text-white text-sm font-bold rounded-lg"
                        style={{ backgroundColor: "var(--color-calm-blue)" }}
                      >
                        {visibleServices[activeService]?.service_type || "Professional"}
                      </span>
                      
                      <button
                        className="px-6 py-2 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, var(--color-light-green), var(--color-calm-blue))",
                        }}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-50"
                   style={{ backgroundColor: "var(--color-light-green)" }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-50"
                   style={{ backgroundColor: "var(--color-calm-blue)" }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;