"use client";
import { useEffect, useState } from "react";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/services");
        const data = await res.json();
        console.log("Fetched services:", data);
        setServices(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Skeleton loader
  const ServiceSkeleton = () => (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 animate-pulse">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-200 mb-4 mx-auto"></div>
      <div className="h-5 sm:h-6 bg-gray-200 rounded mb-3"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-[#f7fdfc] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 bg-[var(--color-light-green)] opacity-50 rounded-full"></div>
      <div className="absolute bottom-12 sm:bottom-20 right-8 sm:right-16 w-10 sm:w-16 h-10 sm:h-16 bg-[var(--color-calm-blue)] opacity-50 rounded-full"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-black)] mb-4">
            Our{" "}
            <span className="text-[var(--color-calm-blue)]">Healthcare</span>{" "}
            Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of health and wellness services
            designed to support your journey to better health.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service._id || index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100"
              >
                {/* Image container with overlay */}
                <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.service_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Service type badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[var(--color-calm-blue)] text-white text-[10px] sm:text-xs font-medium rounded-full">
                      {service.service_type}
                    </span>
                  </div>

                  {/* Quick action button */}
                  <button className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-calm-blue)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </button>
                </div>

                {/* Content container */}
                <div className="p-4 sm:p-5">
                  {/* Title and description */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[var(--color-calm-blue)] transition-colors duration-300">
                    {service.service_name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.specialties?.slice(0, 3).map((specialty, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 sm:py-1 bg-[var(--color-light-green)]/20 text-[var(--color-calm-blue)] text-[11px] sm:text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {service.specialties?.length > 3 && (
                      <span className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-500 text-[11px] sm:text-xs rounded-full">
                        +{service.specialties.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4 sm:mb-5">
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1.5 sm:mr-2 text-[var(--color-light-green)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>{service.availability}</span>
                    </div>

                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <svg
                        className="w-4 h-4 mr-1.5 sm:mr-2 text-[var(--color-light-green)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        ></path>
                      </svg>
                      <span>{service.service_type}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-3 border-t border-gray-100">
                    <button className="text-sm text-[var(--color-calm-blue)] font-medium hover:text-[var(--color-light-green)] transition-colors duration-300 flex items-center justify-center sm:justify-start">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>

                    <button className="px-4 py-2 bg-gradient-to-r from-[var(--color-light-green)] to-[var(--color-calm-blue)] text-white text-sm font-medium rounded-lg hover:shadow-md transition-shadow duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            Can't find what you're looking for?
          </p>
          <button className="bg-white border-2 border-[var(--color-calm-blue)] text-[var(--color-calm-blue)] hover:bg-[var(--color-calm-blue)] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-colors duration-300 shadow-md hover:shadow-lg">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
