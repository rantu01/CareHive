import React from 'react';
import { FileText, Bot, Zap, Shield, MessageSquare, Sparkles, CheckCircle2, Upload, Brain, Clock, Lock, FileCheck } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesSection() {
  const mainFeatures = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Document Analysis",
      description: "Upload medical reports, prescriptions, or lab results and get instant AI-powered analysis in seconds.",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Health Assistant",
      description: "Chat with our intelligent AI to understand complex medical terms, results, and recommendations.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Insights",
      description: "Get clear explanations of abnormal values, medication purposes, and follow-up actions immediately.",
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
    <div className="w-full" style={{ backgroundColor: 'var(--bg-color-all)' }}>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ borderColor: 'var(--color-primary)', backgroundColor: 'rgba(25,180,180,0.1)' }}>
            <Sparkles className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>AI-Powered Health Analysis</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-color-all)' }}>
            Understand Your Health Reports
            <span className="block mt-2" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              In Simple Language
            </span>
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-color-all)' }}>
            Upload medical documents and get instant AI-powered analysis. Ask questions, understand results, and make informed health decisions with confidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={`/dashboard/user/report-analyzer`} className="px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105" style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))', color: 'var(--color-white)' }}>
              <Upload className="w-5 h-5" />
              Try It Free
            </Link>
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
                className="group relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--bg-color-all)' }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))', color: 'var(--color-white)' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-color-all)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-color-all)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-color-all)' }}>
              AI-Powered Health Analysis Works
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-color-all)' }}>
              Get started in four simple steps and unlock the power of AI health analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg h-full" style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--bg-color-all)' }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0" style={{ background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))', color: 'var(--color-white)' }}>
                      {item.icon}
                    </div>
                    <span className="text-5xl font-bold" style={{ color: 'var(--bg-color-all)' }}>{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-color-all)' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color-all)' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: 'var(--text-color-all)' }}>
              Why Choose HealthAI Analyzer
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-color-all)' }}>
              Experience the future of health document understanding with our powerful features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group rounded-xl p-6 border transition-all duration-300 hover:shadow-lg"
                style={{ borderColor: 'var(--color-primary)', backgroundColor: 'var(--bg-color-all)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: 'rgba(25,180,180,0.1)', color: 'var(--color-primary)' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-color-all)' }}>{benefit.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color-all)' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
