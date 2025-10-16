// import React from 'react';
// import YogaTechnique from '../yoga-technique/page';
// import ProgressPage from '../progress/page';
// import Wellness from '@/app/Component/Wellness';

// const page = () => {
//     return (
//         <div className='mt-96'>
//             <h1>This is fitness page</h1>
//             <Wellness></Wellness>
//             <YogaTechnique></YogaTechnique>
//             <ProgressPage></ProgressPage>
            
//         </div>
//     );
// };

// export default page;



"use client";
import { motion } from "framer-motion";
import YogaTechnique from "../yoga-technique/page";
import ProgressPage from "../progress/page";

export default function Fitness() {
  return (
    <section
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ backgroundColor: "var(--dashboard-bg)" }}
    >
      {/* Glowing Background and Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-primary)" }}
        ></div>
        <div
          className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "var(--color-primary)" }}
        ></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        {/* Header Tagline */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(var(--color-white), 0.8)",
            borderColor: "var(--dashboard-border)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--color-primary)" }}
          ></span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-secondary)" }}
          >
            Your Personalized Fitness Hub
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          style={{ color: "var(--text-color-all)" }}
        >
          Elevate Your <span style={{ color: "var(--color-primary)" }}>Fitness Journey</span>
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed opacity-90"
          style={{ color: "var(--text-color-all)" }}
        >
          Unlock your full potential with personalized{" "}
          <span style={{ color: "var(--color-secondary)" }}>Gym Plans</span> and{" "}
          <span style={{ color: "var(--color-secondary)" }}>Yoga Techniques</span>.  
          Track progress, strengthen your body, and calm your mind — all in one place.
        </motion.p>
      </div>
      <YogaTechnique></YogaTechnique>
      <ProgressPage></ProgressPage>
    </section>
  );
}
