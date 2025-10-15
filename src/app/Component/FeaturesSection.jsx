import React from 'react';
import { FileText, Bot, Zap, Shield, MessageSquare, Sparkles, CheckCircle2, Upload, Brain, Clock, Lock, FileCheck } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesSection() {
  const mainFeatures = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Document Analysis",
      description: "Upload medical reports, prescriptions, or lab results and get instant AI-powered analysis in seconds.",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Health Assistant",
      description: "Chat with our intelligent AI to understand complex medical terms, results, and recommendations.",
      gradient: "from-[#19b4b4] to-[#29e6e6]",
      bgGradient: "from-[#19b4b4]/10 to-[#29e6e6]/10",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Insights",
      description: "Get clear explanations of abnormal values, medication purposes, and follow-up actions immediately.",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
  ];

  const benefits = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Simplified Medical Language",
      description: "Complex medical jargon translated into easy-to-understand explanations"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Availability",
      description: "Access your health insights anytime, anywhere, instantly"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Accurate Analysis",
      description: "Powered by advanced AI trained on medical documentation"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Private & Secure",
      description: "Your health data is processed securely and privately"
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      title: "Multiple Document Types",
      description: "Supports lab reports, prescriptions, and medical records"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Interactive Q&A",
      description: "Ask follow-up questions and get detailed answers"
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Upload Document",
      description: "Simply upload your medical report, prescription, or lab result in PDF format",
      icon: <Upload className="w-6 h-6" />,
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our advanced AI scans and analyzes your document in seconds",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      step: "03",
      title: "Get Insights",
      description: "Receive clear explanations, key findings, and personalized recommendations",
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      step: "04",
      title: "Ask Questions",
      description: "Chat with AI to understand anything about your health report",
      icon: <MessageSquare className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#19b4b4]/10 to-[#29e6e6]/10 rounded-full border border-[#19b4b4]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#19b4b4]" />
            <span className="text-sm font-semibold text-[#19b4b4]">AI-Powered Health Analysis</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight">
            Understand Your Health Reports
            <span className="block mt-2 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] bg-clip-text text-transparent">
              In Simple Language
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Upload medical documents and get instant AI-powered analysis. Ask questions, understand results, and make informed health decisions with confidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/dashboard/user/report-analyzer`} className="px-8 py-4 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] hover:shadow-xl hover:shadow-[#19b4b4]/30 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Try It Free
            </Link>
            <button className="px-8 py-4 bg-white hover:bg-gray-50 text-[#111827] rounded-xl font-bold text-lg transition-all duration-300 border-2 border-gray-200 hover:border-[#19b4b4] flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#19b4b4]" />
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#19b4b4]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in four simple steps and unlock the power of AI health analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#19b4b4]/50 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#19b4b4] to-[#29e6e6] rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-5xl font-bold text-gray-100">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
              Why Choose HealthAI Analyzer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of health document understanding with our powerful features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-[#19b4b4]/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#19b4b4]/10 to-[#29e6e6]/10 rounded-xl flex items-center justify-center text-[#19b4b4] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Reports Analyzed" },
              { number: "98%", label: "Accuracy Rate" },
              { number: "24/7", label: "Always Available" },
              { number: "<10s", label: "Analysis Time" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#19b4b4] to-[#29e6e6] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}