"use client";
import React from "react";
import { Apple, Sparkles, Code, Rocket, Cpu } from "lucide-react";
import { FaReact, FaNodeJs, FaDatabase, FaFigma, FaGithub } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

const team = [
  {
    name: "Runtu Mondal",
    role: "Team Leader & Full-Stack Developer",
    image: "https://i.ibb.co.com/gZRDrPDv/rantu.jpg",
  },
  {
    name: "Dip Chondo Partho",
    role: "Frontend Developer",
    image: "https://i.ibb.co.com/v6fXffF6/dip.jpg",
  },
  {
    name: "Julfikar Al Rafi",
    role: "Backend Developer",
    image: "https://i.ibb.co.com/rKyGNJTN/rafi.jpg",
  },
  {
    name: "Pinky Biswas",
    role: "Full-Stack Developer",
    image: "https://i.ibb.co.com/JwJRXgRf/pinky.jpg",
  },
  {
    name: "Rowshon Ummi",
    role: "Content & Documentation Specialist",
    image: "https://i.ibb.co.com/r2xZbN9Y/ummi.jpg",
  },
  {
    name: "Umme Sadia Sayti",
    role: "Frontend Developer & Presenter",
    image: "https://i.ibb.co.com/pBmd5n3Y/sayti.jpg",
  },
];

const AboutUs = () => {
  return (
    <section className="bg-[var(--dashboard-bg)] text-[var(--text-color-all)] font-[var(--font-primary)]">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-6 pt-24 mb-10 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-[var(--color-primary)] mb-4 flex justify-center items-center">
          About Us
          <Sparkles className="w-8 h-8 text-[var(--color-primary)] ml-3" />
        </h2>
        <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto leading-relaxed">
          We are <span className="text-[var(--color-primary)] font-semibold">Team Web Infinity</span> — a passionate group of students who developed this Health & Wellness website to promote well-being through technology and teamwork.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
            <span className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider">
              Our Mission
            </span>
            <div className="w-4 h-0.5 bg-[var(--color-primary)]"></div>
          </div>

          <h1 className="text-4xl md:text-5xl mb-4 text-[var(--color-primary)] flex items-center gap-3 font-[var(--font-heading)]">
            <Apple className="w-7 h-7" />
            Dedicated to Digital Wellness
            <Sparkles className="w-7 h-7" />
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-4 leading-relaxed">
            Our mission is to design a platform that encourages a balanced lifestyle — helping users focus on both physical and mental health through a digital experience.
          </p>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed">
            As students and developers, we aim to combine creativity, technology, and empathy to make wellness more accessible to everyone.
          </p>
        </div>

        <div className="relative rounded-3xl shadow-xl overflow-hidden w-full h-[28rem] transition-transform duration-500 hover:scale-[1.02]">
          <div
            className="absolute -inset-1 rounded-3xl blur-2xl opacity-30"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
          ></div>
          <img
            src="https://i.ibb.co.com/sJRNVDxT/sayti.jpg"
            alt="Health care"
            className="w-full h-full object-cover relative z-10"
          />
        </div>
      </div>

      {/* Project Overview */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h3 className="text-4xl md:text-5xl mb-6 text-[var(--color-primary)] font-[var(--font-heading)] flex justify-center items-center gap-2">
          <Code className="w-8 h-8" /> Project Overview
        </h3>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed">
          Our Health & Wellness platform helps users explore daily health routines, connect with wellness experts, and learn about maintaining a balanced life. 
          Built with modern web technologies, the project focuses on accessibility, responsiveness, and a smooth user experience.
        </p>
      </div>

      {/* Technologies Used */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-4xl md:text-5xl text-center mb-10 text-[var(--color-primary)] font-[var(--font-heading)] flex justify-center gap-2">
          <Cpu className="w-12 h-12" /> Technologies We Used
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          <div className="flex flex-col items-center">
            <FaReact className="text-5xl text-[var(--color-primary)] mb-2" />
            <p className="text-lg md:text-xl">React.js</p>
          </div>
          <div className="flex flex-col items-center">
            <SiNextdotjs className="text-5xl text-[var(--color-primary)] mb-2" />
            <p className="text-lg md:text-xl">Next.js</p>
          </div>
          <div className="flex flex-col items-center">
            <FaNodeJs className="text-5xl text-[var(--color-primary)] mb-2" />
            <p className="text-lg md:text-xl">Express.js</p>
          </div>
          <div className="flex flex-col items-center">
            <FaDatabase className="text-5xl text-[var(--color-primary)] mb-2" />
            <p className="text-lg md:text-xl">MongoDB</p>
          </div>
          <div className="flex flex-col items-center">
            <FaFigma className="text-5xl text-[var(--color-primary)] mb-2" />
            <p className="text-lg md:text-xl">Figma</p>
          </div>
          <div className="flex flex-col items-center">
            <FaGithub className="text-5xl text-[var(--color-primary)] mb-2" />
            <p className="text-lg md:text-xl">GitHub</p>
          </div>
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="bg-[var(--bg-color-all)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="flex items-center justify-center gap-3 text-4xl md:text-5xl text-center mb-10 text-[var(--color-primary)] font-[var(--font-heading)]">
            Meet Our Team
            <Sparkles className="w-7 h-7 text-[var(--color-primary)]" />
          </h3>

          <p className="text-center mb-12 text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
            Behind this project stands a dedicated team of developers, designers, and content creators who collaborated to turn a simple idea into a meaningful platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="rounded-3xl shadow-md overflow-hidden transition-transform duration-500 hover:-translate-y-2"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 object-cover object-top rounded-t-3xl"
                />
                <div className="p-5 text-center">
                  <h4 className="font-semibold text-xl md:text-2xl text-[var(--color-primary)]">
                    {member.name}
                  </h4>
                  <p className="text-lg md:text-xl opacity-80 text-[var(--text-color-all)]">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h3 className="text-4xl md:text-5xl mb-6 text-[var(--color-primary)] font-[var(--font-heading)] flex justify-center items-center gap-2">
          <Rocket className="w-10 h-10" /> Our Vision
        </h3>
        <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
          Our vision is to continue enhancing this platform by integrating smarter health tools, data-driven insights, and community features — empowering users to live healthier and more balanced lives.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
