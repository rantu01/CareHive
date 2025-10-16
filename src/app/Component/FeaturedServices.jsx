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
      {/* SKELETON: Using a solid light-green color instead of gradient blur */}
      <div 
        className="absolute -inset-1 rounded-2xl blur opacity-20 animate-pulse"
        style={{ backgroundColor: "var(--color-primary)" }}
      ></div>
      <div
        className="relative p-6 rounded-xl h-full min-h-[140px] backdrop-blur-sm"
        style={{
          backgroundColor: "var(--dashboard-bg)",
          border: "1px solid var(--dashboard-border)",
        }}
      >
        <div className="flex items-start space-x-4">
          <div
            className="w-12 h-12 rounded-xl flex-shrink-0 animate-pulse"
            style={{ backgroundColor: "var(--gray-color)" }}
          ></div>
          <div className="flex-1 space-y-3">
            <div
              className="h-5 rounded w-3/4 animate-pulse"
              style={{ backgroundColor: "var(--gray-color)" }}
            ></div>
            <div
              className="h-3 rounded w-full animate-pulse"
              style={{ backgroundColor: "var(--gray-color)" }}
            ></div>
            <div
              className="h-3 rounded w-2/3 animate-pulse"
              style={{ backgroundColor: "var(--gray-color)" }}
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
      {/* Enhanced Background Elements - Using light-green only */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: "var(--color-primary)" }}></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
              style={{ backgroundColor: "var(--color-primary)" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-2xl"
              style={{ backgroundColor: "var(--color-primary)" }}></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(var(--color-primary) 1px, transparent 1px),
                  linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                backgroundPosition: 'center center'
              }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(var(--color-white), 0.8)",
                borderColor: "var(--dashboard-border)",
              }}>
            <span className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--color-primary)" }}></span>
            <span className="text-sm font-medium"
                  style={{ color: "var(--color-secondary)" }}>
              Premium Healthcare Services
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl md:text-5xl font-bold mb-6 tracking-tight"
            style={{ color: "var(--fourground-color)" }}
          >
            Exceptional{" "}
            {/* 2. MEDICAL CARE TEXT: Set solid color */}
            <span 
              className="relative inline-block"
              style={{ color: "var(--color-primary)" }}
            >
              Medical Care
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 20"
              >
                <path
                  d="M10,10 C40,5 160,15 190,10"
                  stroke="var(--color-primary)" // Solid color underline
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90"
            style={{ color: "var(--fourground-color)" }}
          >
            Comprehensive healthcare solutions tailored to your needs with expert care and cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Enhanced Services Cards */}
          <div className="relative">
            {/* Enhanced Navigation - changed button colors */}
            <div className="flex justify-between items-center mb-8 p-4 rounded-2xl backdrop-blur-sm border"
                  style={{
                    backgroundColor: "rgba(var(--color-white), 0.5)",
                    borderColor: "var(--dashboard-border)",
                  }}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--color-primary)", // Kept for service count badge
                        color: "var(--color-white)",
                      }}>
                  {services.length} Services
                </span>
                <span className="text-sm opacity-70"
                      style={{ color: "var(--fourground-color)" }}>
                  Showing {Math.min(3, services.length)} of {services.length}
                </span>
              </div>

              <div className="flex space-x-3">
                {/* PREV BUTTON: Changed to light-green border and text */}
                <button
                  onClick={prevService}
                  disabled={isLoading || services.length <= 3}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed group"
                  style={{
                    backgroundColor: "var(--color-white)",
                    border: "2px solid var(--color-primary)", // Changed border
                    color: "var(--color-primary)", // Changed text color
                  }}
                >
                  <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* NEXT BUTTON: Changed to solid light-green background */}
                <button
                  onClick={nextService}
                  disabled={isLoading || services.length <= 3}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed group"
                  style={{
                    backgroundColor: "var(--color-primary)", // Changed background
                    color: "var(--fourground-color)", // Set text color for visibility
                  }}
                >
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Enhanced Services Cards */}
            <div className="space-y-6">
              {isLoading ? (
                [...Array(3)].map((_, i) => <ServiceSkeleton key={i} />)
              ) : (
                visibleServices.map((service, index) => (
                  <div
                    key={service._id || index}
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      activeService === index ? 'transform -translate-y-2' : 'hover:-translate-y-1'
                    }`}
                    onMouseEnter={() => setActiveService(index)}
                    onClick={() => setActiveService(index)}
                  >
                    {/* CARD BORDER: Solid light-green blur */}
                    <div 
                      className={`absolute -inset-0.5 rounded-2xl blur transition-all duration-500 ${
                        activeService === index 
                          ? 'opacity-80' 
                          : 'opacity-30 group-hover:opacity-50'
                      }`}
                      style={{ backgroundColor: "var(--color-primary)" }}
                    ></div>
                    
                    <div
                      className="relative p-6 rounded-2xl transition-all duration-500 backdrop-blur-sm"
                      style={{
                        backgroundColor: "var(--dashboard-bg)",
                        border: "1px solid var(--dashboard-border)",
                        boxShadow: activeService === index 
                          ? "0 20px 40px rgba(0,0,0,0.1)" 
                          : "0 4px 20px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Enhanced Service Icon - solid color for blur */}
                        <div className="relative flex-shrink-0">
                          <div className="relative group-hover:scale-110 transition-transform duration-500">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden relative">
                              <img
                                src={service.image_url}
                                alt={service.service_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -inset-2 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                                style={{ backgroundColor: "var(--color-primary)" }}></div>
                          </div>
                        </div>

                        {/* Enhanced Content - unchanged colors */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <h3
                              className="text-xl font-bold pr-4 transition-colors duration-300 truncate"
                              style={{ 
                                color: activeService === index 
                                  ? "var(--color-secondary)" 
                                  : "var(--fourground-color)" 
                              }}
                            >
                              {service.service_name}
                            </h3>
                            
                            {/* Animated Arrow - unchanged colors, kept blue for contrast/branding */}
                            <div className={`transform transition-all duration-300 ${
                              activeService === index 
                                ? 'translate-x-1 scale-110' 
                                : 'translate-x-0 scale-100'
                            }`}>
                              <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                                    style={{
                                      backgroundColor: activeService === index 
                                        ? "var(--color-secondary)" 
                                        : "var(--gray-color)",
                                      color: activeService === index 
                                        ? "var(--color-white)" 
                                        : "var(--color-secondary)",
                                    }}>
                                <svg
                                  className="w-4 h-4"
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
                          </div>

                          <p
                            className="text-base mb-4 line-clamp-2 leading-relaxed opacity-90"
                            style={{ color: "var(--fourground-color)" }}
                          >
                            {service.description}
                          </p>

                          {/* Enhanced Specialties - unchanged colors */}
                          <div className="flex flex-wrap gap-2">
                            {service.specialties?.slice(0, 3).map((specialty, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105"
                                style={{
                                  backgroundColor: activeService === index 
                                    ? "var(--color-secondary)" 
                                    : "rgba(var(--color-primary), 0.15)",
                                  color: activeService === index 
                                    ? "var(--color-white)" 
                                    : "var(--color-secondary)",
                                  border: activeService === index 
                                    ? "none" 
                                    : "1px solid rgba(var(--color-secondary), 0.2)",
                                }}
                              >
                                {specialty}
                              </span>
                            ))}
                            {service.specialties && service.specialties.length > 3 && (
                              <span
                                className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor: "var(--gray-color)",
                                  color: "var(--fourground-color)",
                                }}
                              >
                                +{service.specialties.length - 3} more
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

            {/* Enhanced View All Button - already light-green */}
            <div className="text-center mt-12">
              <button
                className="group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                style={{
                  color: "var(--color-white)",
                  backgroundColor: "var(--color-primary)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore All Services
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
                
                {/* Border Glow: Solid light-green blur */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{ backgroundColor: "var(--color-primary)" }}
                ></div>
              </button>
            </div>
          </div>

          {/* Right Side - Enhanced Featured Image */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Enhanced Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                {/* Enhanced Background Pattern - simplified to one color */}
                <div className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, var(--color-primary) 2%, transparent 0%), 
                                           radial-gradient(circle at 75px 75px, var(--color-primary) 2%, transparent 0%)`,
                        backgroundSize: '100px 100px'
                      }}></div>

                {isLoading ? (
                  <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-3xl"></div>
                ) : (
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src={visibleServices[activeService]?.image_url || "/api/placeholder/600/600"}
                      alt={visibleServices[activeService]?.service_name || "Healthcare Service"}
                      className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                )}
                
                {/* Enhanced Floating Info Card */}
                <div className="absolute bottom-6 left-6 right-6 z-20 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                  <div
                    className="p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 shadow-2xl"
                    style={{
                      backgroundColor: "rgba(var(--dashboard-bg), 0.85)",
                      border: "1px solid rgba(var(--dashboard-border), 0.5)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: "var(--color-primary)" }}></span>
                      <span className="text-sm font-semibold uppercase tracking-wider opacity-70"
                            style={{ color: "var(--color-secondary)" }}>
                        Featured Service
                      </span>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: "var(--color-primary)" }}
                    >
                      {visibleServices[activeService]?.service_name || "Premium Healthcare"}
                    </h3>
                    <p
                      className="text-base mb-6 leading-relaxed opacity-90"
                      style={{ color: "var(--fourground-color)" }}
                    >
                      {visibleServices[activeService]?.description || "Experience world-class healthcare services with our expert team and cutting-edge technology."}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span
                        className="px-4 py-2 text-white text-sm font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: "var(--color-secondary)", // Kept blue for contrast
                        }}
                      >
                        {visibleServices[activeService]?.service_type || "Professional Care"}
                      </span>
                      
                      {/* BOOK NOW BUTTON: already light-green */}
                      <button
                        className="px-6 py-2 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 group"
                        style={{
                          backgroundColor: "var(--color-primary)",
                        }}
                      >
                        Book Now
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Enhanced Decorative Elements - unchanged color */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-60 animate-bounce"
                      style={{ 
                        backgroundColor: "var(--color-primary)",
                        animationDelay: '0.2s'
                      }}></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-60 animate-bounce"
                      style={{ 
                        backgroundColor: "var(--color-secondary)", // Kept blue for visual distinction
                        animationDelay: '0.4s'
                      }}></div>
              </div>

              {/* Progress Indicator - unchanged colors, kept blue for contrast */}
              <div className="flex justify-center mt-6 space-x-2">
                {services.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveService(index);
                      setCurrentIndex(Math.max(0, index - 1));
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeService === index ? 'scale-125' : 'scale-100'
                    }`}
                    style={{
                      backgroundColor: activeService === index 
                        ? "var(--color-secondary)" 
                        : "var(--dashboard-border)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;