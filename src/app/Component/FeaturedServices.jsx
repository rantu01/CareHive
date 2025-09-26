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
        setServices(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  const ServiceSkeleton = () => (
    <div
      className="p-4 sm:p-6 rounded-2xl shadow-lg animate-pulse"
      style={{
        backgroundColor: "var(--dashboard-bg)",
        border: "1px solid var(--dashboard-border)",
      }}
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-4 mx-auto"
        style={{ backgroundColor: "var(--dashboard-bg)" }}
      ></div>
      <div
        className="h-5 sm:h-6 rounded mb-3"
        style={{ backgroundColor: "var(--dashboard-bg)" }}
      ></div>
      <div
        className="h-3 sm:h-4 rounded mb-2"
        style={{ backgroundColor: "var(--dashboard-bg)" }}
      ></div>
      <div
        className="h-3 sm:h-4 rounded w-3/4"
        style={{ backgroundColor: "var(--dashboard-bg)" }}
      ></div>
    </div>
  );

  return (
    <section
      className="py-12 sm:py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-6 sm:top-10 left-6 sm:left-10 w-16 sm:w-24 h-16 sm:h-24 rounded-full opacity-50"
        style={{ backgroundColor: "var(--color-light-green)" }}
      ></div>
      <div
        className="absolute bottom-12 sm:bottom-20 right-8 sm:right-16 w-10 sm:w-16 h-10 sm:h-16 rounded-full opacity-50"
        style={{ backgroundColor: "var(--color-calm-blue)" }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--fourground-color)" }}
          >
            Our{" "}
            <span style={{ color: "var(--color-calm-blue)" }}>Healthcare</span>{" "}
            Services
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "var(--fourground-color)" }}
          >
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
            {services?.map((service, index) => (
              <div
                key={service._id || index}
                className="rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 group"
                style={{
                  backgroundColor: "var(--dashboard-bg)",
                  border: "1px solid var(--dashboard-border)",
                }}
              >
                {/* Image container */}
                <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                  <img
                    src={service.image_url}
                    alt={service.service_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  ></div>

                  {/* Service type badge */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <span
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-white text-[10px] sm:text-xs font-medium rounded-full"
                      style={{ backgroundColor: "var(--color-calm-blue)" }}
                    >
                      {service.service_type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3
                    className="text-base sm:text-lg font-bold mb-2 line-clamp-1 group-hover:transition-colors duration-300"
                    style={{ color: "var(--color-black)" }}
                  >
                    {service.service_name}
                  </h3>
                  <p
                    className="text-sm sm:text-base mb-4 line-clamp-2"
                    style={{ color: "var(--fourground-color)" }}
                  >
                    {service.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.specialties?.slice(0, 3).map((specialty, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-full"
                        style={{
                          backgroundColor: "var(--color-light-green)/20",
                          color: "var(--color-calm-blue)",
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-3 border-t"
                       style={{ borderColor: "var(--dashboard-border)" }}>
                    <button
                      className="text-sm font-medium flex items-center justify-center sm:justify-start transition-colors duration-300"
                      style={{ color: "var(--color-calm-blue)" }}
                    >
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

                    <button
                      className="px-4 py-2 text-white text-sm font-medium rounded-lg transition-shadow duration-300"
                      style={{
                        background: `linear-gradient(to right, var(--color-light-green), var(--color-calm-blue))`,
                      }}
                    >
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
          <p
            className="text-base sm:text-lg mb-4 sm:mb-6"
            style={{ color: "var(--fourground-color)" }}
          >
            Can't find what you're looking for?
          </p>
          <button
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
            style={{
              color: "var(--color-calm-blue)",
              backgroundColor: "var(--color-white)",
              border: "2px solid var(--color-calm-blue)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-calm-blue)";
              e.currentTarget.style.color = "var(--color-white)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-white)";
              e.currentTarget.style.color = "var(--color-calm-blue)";
            }}
          >
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
