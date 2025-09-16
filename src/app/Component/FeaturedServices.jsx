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

        

        // Always ensure it's an array
        if (Array.isArray(data)) {
          setServices(data);
        } else if (data?.services && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          console.error("⚠️ Unexpected API response:", data);
          setServices([]); // fallback
        }

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
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 animate-pulse">
      <div className="w-20 h-20 rounded-2xl bg-gray-200 mb-4 mx-auto"></div>
      <div className="h-6 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-[#f7fdfc] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[var(--color-light-green)] opacity-50 rounded-full"></div>
      <div className="absolute bottom-20 right-16 w-16 h-16 bg-[var(--color-calm-blue)] opacity-50 rounded-full"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-black)] mb-4">
            Our{" "}
            <span className="text-[var(--color-calm-blue)]">Healthcare</span>{" "}
            Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of health and wellness services
            designed to support your journey to better health.
          </p>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <ServiceSkeleton key={i} />
            ))}
          </div>
        ) : Array.isArray(services) && services.length > 0 ? (
          /* Safe map rendering */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service._id || index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100"
              >
                {/* Image container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.service_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--color-calm-blue)] text-white text-xs font-medium rounded-full">
                      {service.service_type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[var(--color-calm-blue)] transition-colors duration-300">
                    {service.service_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.specialties?.slice(0, 3).map((specialty, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[var(--color-light-green)]/20 text-[var(--color-calm-blue)] text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {service.specialties?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{service.specialties.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{service.availability}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{service.service_type}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <button className="text-sm text-[var(--color-calm-blue)] font-medium hover:text-[var(--color-light-green)] transition-colors duration-300 flex items-center">
                      Learn More →
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-[var(--color-light-green)] to-[var(--color-calm-blue)] text-white text-sm font-medium rounded-lg hover:shadow-md transition-shadow duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No services fallback */
          <p className="text-center text-gray-500">No services available</p>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <button className="bg-white border-2 border-[var(--color-calm-blue)] text-[var(--color-calm-blue)] hover:bg-[var(--color-calm-blue)] hover:text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300 shadow-md hover:shadow-lg">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
