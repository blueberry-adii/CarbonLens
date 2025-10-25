import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "./components/AnimatedSection";
import { useAuth } from "../../utils/AuthContext";
import {
  Leaf,
  Camera,
  BarChart3,
  Users,
  ArrowRight,
  Play,
  Check,
  Star,
  Globe,
  Smartphone,
  Zap,
  Award,
  TrendingUp,
  Heart,
  Menu,
  X,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const reviewsRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const pricingRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetStarted = () => {
    if (user) navigate("/app");
    else navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                CarbonLens
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                onClick={() => {
                  scrollToSection(featuresRef);
                }}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors cursor-pointer"
              >
                Features
              </a>
              <a
                onClick={() => {
                  scrollToSection(howItWorksRef);
                }}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors cursor-pointer"
              >
                How it Works
              </a>
              <a
                onClick={() => {
                  scrollToSection(reviewsRef);
                }}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors cursor-pointer"
              >
                Reviews
              </a>
              <a
                onClick={() => {
                  scrollToSection(pricingRef);
                }}
                className="text-gray-600 hover:text-green-600 font-medium transition-colors cursor-pointer"
              >
                Pricing
              </a>
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <a
                  onClick={() => {
                    scrollToSection(featuresRef);
                  }}
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Features
                </a>
                <a
                  onClick={() => {
                    scrollToSection(howItWorksRef);
                  }}
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  How it Works
                </a>
                <a
                  onClick={() => {
                    scrollToSection(reviewsRef);
                  }}
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Reviews
                </a>
                <a
                  onClick={() => {
                    scrollToSection(pricingRef);
                  }}
                  className="text-gray-600 hover:text-green-600 font-medium"
                >
                  Pricing
                </a>
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-medium w-full cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="pt-20 pb-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-200 rounded-full opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-200 rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <AnimatedSection id="hero-title">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Track Your
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Carbon Footprint
                </span>
                with AI
              </h1>
            </AnimatedSection>

            <AnimatedSection id="hero-subtitle">
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Simply snap a photo of your meal and get instant carbon
                footprint analysis. Make sustainable choices with AI-powered
                insights.
              </p>
            </AnimatedSection>

            <AnimatedSection id="hero-cta">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={() => navigate("/app")}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer"
                >
                  <Camera size={24} />
                  Start Tracking Now
                  <ArrowRight size={20} />
                </button>
                <button className="flex items-center gap-3 text-gray-700 hover:text-green-600 font-medium group cursor-pointer">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                    <Play size={20} className="ml-1" />
                  </div>
                  Watch Demo
                </button>
              </div>
            </AnimatedSection>

            <AnimatedSection id="hero-stats">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">50K+</div>
                  <div className="text-gray-600">Meals Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">12K+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    2.5M kg
                  </div>
                  <div className="text-gray-600">CO₂ Saved</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section ref={featuresRef} id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection id="features-header">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Powerful Features for
                <span className="text-green-600"> Sustainable Living</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to understand and reduce your environmental
                impact
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "AI Food Recognition",
                description:
                  "Just snap a photo and our AI instantly identifies your food and calculates its carbon footprint.",
                color: "bg-blue-500",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description:
                  "Beautiful charts and insights help you understand your eating patterns and environmental impact.",
                color: "bg-green-500",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description:
                  "Set goals, track your carbon reduction progress, and celebrate sustainability milestones.",
                color: "bg-purple-500",
              },
              {
                icon: Users,
                title: "Social Challenges",
                description:
                  "Join friends in sustainability challenges and compete on global leaderboards.",
                color: "bg-orange-500",
              },
              {
                icon: Zap,
                title: "Instant Insights",
                description:
                  "Get personalized recommendations for lower-carbon alternatives to your favorite meals.",
                color: "bg-yellow-500",
              },
              {
                icon: Globe,
                title: "Real Impact",
                description:
                  "See how your choices contribute to global carbon reduction and environmental preservation.",
                color: "bg-teal-500",
              },
            ].map((feature, index) => (
              <AnimatedSection key={index} id={`feature-${index}`}>
                <div
                  className={`group hover:scale-105 transition-all duration-300 `}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div
                      className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={howItWorksRef}
        id="how-it-works"
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection id="how-it-works-header">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three simple steps to start your sustainable journey
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Camera,
                title: "Snap a Photo",
                description:
                  "Take a picture of your meal using your phone's camera. Our AI works with any food photo.",
              },
              {
                step: "02",
                icon: BarChart3,
                title: "Get Instant Analysis",
                description:
                  "Our AI identifies ingredients and calculates the carbon footprint in seconds with detailed breakdown.",
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Track & Improve",
                description:
                  "Monitor your progress, get personalized tips, and make more sustainable food choices daily.",
              },
            ].map((step, index) => (
              <AnimatedSection key={index} id={`step-${index}`}>
                <div className="relative">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 transform"></div>
                  )}
                  <div className="bg-white p-8 rounded-2xl shadow-lg text-center relative z-10">
                    <div className="text-6xl font-bold text-green-100 mb-4">
                      {step.step}
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 -mt-12 relative z-10">
                      <step.icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section ref={reviewsRef} id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection id="testimonials-header">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of people making a difference for our planet
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Environmental Scientist",
                image: "👩‍🔬",
                rating: 5,
                testimonial:
                  "CarbonLens has completely changed how I think about food. The AI analysis is incredibly accurate and the insights help me make better choices every day.",
              },
              {
                name: "Mike Chen",
                role: "Software Developer",
                image: "👨‍💻",
                rating: 5,
                testimonial:
                  "As a tech person, I'm impressed by the AI accuracy. But as a human, I love how it's helping me reduce my environmental impact without sacrificing the foods I enjoy.",
              },
              {
                name: "Emma Rodriguez",
                role: "College Student",
                image: "👩‍🎓",
                rating: 5,
                testimonial:
                  "The social features are amazing! Competing with friends to reduce carbon footprint makes sustainability fun and engaging. Highly recommend!",
              },
            ].map((testimonial, index) => (
              <AnimatedSection key={index} id={`testimonial-${index}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section ref={pricingRef} id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection id="pricing-header">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start free, upgrade when you're ready to unlock advanced
                features
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                description: "Perfect for getting started with carbon tracking",
                features: [
                  "10 meal analyses per month",
                  "Basic carbon footprint tracking",
                  "Weekly insights report",
                  "Mobile app access",
                ],
                cta: "Start Free",
                popular: false,
                onClick: handleGetStarted,
              },
              {
                name: "Pro",
                price: "$9",
                period: "per month",
                description: "Unlock the full potential of sustainable living",
                features: [
                  "Unlimited meal analyses",
                  "Advanced analytics & trends",
                  "Personalized recommendations",
                  "Social challenges & leaderboards",
                  "Carbon offset marketplace",
                  "Priority support",
                ],
                cta: "Upgrade to Pro",
                popular: true,
                onClick: () => {},
              },
            ].map((plan, index) => (
              <AnimatedSection key={index} id={`plan-${index}`}>
                <div
                  className={`relative bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl ${
                    plan.popular ? "ring-2 ring-green-500 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Award size={16} />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <Check
                          size={20}
                          className="text-green-500 flex-shrink-0"
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={plan.onClick}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
                      plan.popular
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection id="cta-section">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Reduce Your Carbon Footprint?
              </h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Join thousands of people making a positive impact on our planet,
                one meal at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 mx-auto sm:mx-0 transform hover:scale-105 cursor-pointer">
                  <Smartphone size={24} />
                  Download App
                  <ArrowRight size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 mx-auto sm:mx-0 cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Leaf size={24} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-white">
                  CarbonLens
                </span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Making sustainable living accessible through AI-powered carbon
                footprint tracking. Every meal choice matters for our planet's
                future.
              </p>
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-red-500" />
                <span className="text-gray-400">Made with love for Earth</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <a
                  onClick={() => {
                    scrollToSection(featuresRef);
                  }}
                  className="block text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </a>
                <a
                  onClick={() => {
                    scrollToSection(pricingRef);
                  }}
                  className="block text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Pricing
                </a>
                <a className="block text-gray-400 hover:text-white transition-colors cursor-pointer">
                  API
                </a>
                <a className="block text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Integrations
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a className="block text-gray-400 hover:text-white transition-colors cursor-pointer">
                  About
                </a>
                <a className="block text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Blog
                </a>
                <a className="block text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Careers
                </a>
                <a className="block text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 CarbonLens. All rights reserved. Building a sustainable
              future together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
