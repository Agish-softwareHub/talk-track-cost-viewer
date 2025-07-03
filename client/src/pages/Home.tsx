import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Bot, Phone, Brain, Zap, Shield, Target, ArrowRight, CheckCircle, Users, BarChart3, Headphones, Clock,
  Sparkles, Globe, MessageCircle, TrendingUp, Award, Star, Play, ChevronRight, Menu, X,
  Database, Code, Layers, Workflow, GitBranch, Cpu, Network, Gauge, Rocket, Building2, Briefcase,
  Github, Twitter, Linkedin, Mail, Calendar, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const phrases = [
    "Transform Customer Service",
    "Scale with Intelligence", 
    "Automate with Empathy",
    "Deliver Excellence 24/7"
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    let charIndex = 0;
    const typeTimer = setInterval(() => {
      if (charIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
          setTypedText("");
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [currentIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
    { name: "Company", href: "#company" }
  ];

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Agents",
      description: "Deploy intelligent AI agents that understand context, emotion, and complex customer needs with human-like conversation abilities.",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      features: ["Natural Language Processing", "Emotional Intelligence", "Multi-language Support", "Context Awareness"]
    },
    {
      icon: Brain,
      title: "Advanced Analytics",
      description: "Real-time insights with sentiment analysis, performance metrics, and predictive analytics to optimize your call center operations.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      features: ["Sentiment Analysis", "Performance Tracking", "Predictive Insights", "Custom Dashboards"]
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times with 99.9% uptime ensuring your customers never wait for intelligent assistance.",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      features: ["<1s Response Time", "99.9% Uptime", "Global Infrastructure", "Auto-scaling"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption, compliance standards, and data protection for enterprise peace of mind.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      features: ["End-to-end Encryption", "SOC 2 Compliance", "GDPR Ready", "Data Residency"]
    }
  ];

  const stats = [
    { value: "99.5%", label: "Customer Satisfaction", icon: Target, color: "text-green-600" },
    { value: "24/7", label: "Availability", icon: Clock, color: "text-blue-600" },
    { value: "50K+", label: "Calls Handled Daily", icon: Phone, color: "text-purple-600" },
    { value: "0.8s", label: "Average Response", icon: Zap, color: "text-yellow-600" }
  ];

  const solutions = [
    {
      icon: Building2,
      title: "Enterprise",
      description: "Large-scale deployment with custom integrations",
      features: ["Unlimited agents", "Custom integrations", "Dedicated support", "SLA guarantees"],
      popular: false
    },
    {
      icon: Briefcase,
      title: "Business",
      description: "Perfect for growing teams and businesses",
      features: ["Up to 50 agents", "Advanced analytics", "API access", "Priority support"],
      popular: true
    },
    {
      icon: Rocket,
      title: "Startup",
      description: "Get started with essential AI call features",
      features: ["Up to 10 agents", "Basic analytics", "Email support", "Standard integrations"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Inc",
      avatar: "SC",
      content: "AI CallCenter transformed our customer service. 70% cost reduction and 40% faster resolution times.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Operations Director, GlobalCorp",
      avatar: "MR", 
      content: "The AI agents are incredibly smart. Customers can't tell the difference from human agents.",
      rating: 5
    },
    {
      name: "Lisa Wang",
      role: "Head of Support, StartupXYZ",
      avatar: "LW",
      content: "Scaling from 10 to 1000 daily calls was seamless. The platform just works perfectly.",
      rating: 5
    }
  ];

  const integrations = [
    { name: "Salesforce", logo: "🏢" },
    { name: "HubSpot", logo: "🎯" },
    { name: "Zendesk", logo: "💬" },
    { name: "Slack", logo: "💬" },
    { name: "Teams", logo: "👥" },
    { name: "WhatsApp", logo: "📱" },
    { name: "Twilio", logo: "📞" },
    { name: "AWS", logo: "☁️" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                AI CallCenter
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex">
                Sign In
              </Button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try Dashboard
                </Button>
              </Link>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              {navigationItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="block text-gray-600 hover:text-gray-900 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button variant="ghost" className="w-full justify-start">
                Sign In
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="h-5 w-5 rotate-[-90deg]" />
        </button>
      )}

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div 
          className="absolute top-1/4 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{ transform: `translateY(${scrollY * -0.3}px)` }}
        ></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-300/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200/50">
              <Sparkles className="mr-2 h-4 w-4" />
              Next-Generation AI Call Center Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              <span className="block">{typedText}</span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                with AI Agents
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Deploy intelligent AI agents that handle customer calls with unprecedented accuracy, 
              empathy, and efficiency. <span className="font-semibold">Scale infinitely</span> while reducing costs by 70%.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all">
                  <Bot className="mr-2 h-5 w-5" />
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 hover:bg-gray-50">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Live Demo Teaser */}
            <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Live AI Agent Demo</span>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="text-left space-y-2">
                <div className="bg-blue-50 rounded-lg p-3">
                  <span className="text-sm text-blue-700">🤖 AI Agent: "Hello! I'm here to help with your billing inquiry. I see you're calling about invoice #1247. Let me look that up for you right away."</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm text-gray-700">👤 Customer: "Yes, I have a question about the charges..."</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 mb-4 ${stat.color} group-hover:shadow-lg transition-shadow`}>
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
              <Cpu className="mr-2 h-4 w-4" />
              Advanced Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose AI CallCenter?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of customer service with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 ${
                  activeFeature === index ? 'scale-105 shadow-2xl' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(-1)}
              >
                <CardHeader className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3 text-gray-900">{feature.title}</CardTitle>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid grid-cols-2 gap-3">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
              <Layers className="mr-2 h-4 w-4" />
              Solutions for Every Scale
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startups to enterprise, we have the perfect solution for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card 
                key={index} 
                className={`relative hover:shadow-xl transition-all duration-300 ${
                  solution.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {solution.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Star className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${
                    solution.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700'
                  } mb-4 mx-auto`}>
                    <solution.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{solution.title}</CardTitle>
                  <p className="text-gray-600">{solution.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  <Button 
                    className={`w-full mt-6 ${
                      solution.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    } text-white`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
              <Workflow className="mr-2 h-4 w-4" />
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deploy intelligent AI agents in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "01",
                title: "Connect Your Systems",
                description: "Integrate with your existing CRM, helpdesk, and communication tools in minutes",
                icon: Network,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02", 
                title: "Train Your AI Agents",
                description: "Upload your knowledge base and configure AI agents with your business rules",
                icon: Brain,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Go Live Instantly",
                description: "Start handling customer calls with intelligent AI agents that learn and improve",
                icon: Rocket,
                color: "from-green-500 to-teal-500"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-6xl font-bold text-gray-200 mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              <Play className="mr-2 h-4 w-4" />
              Live Demo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See AI CallCenter in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch our AI agents handle real customer interactions with human-like intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">AI CallCenter Dashboard</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white">Incoming Call</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">AI Agent Response Time</div>
                    <div className="text-2xl font-bold text-white">0.3s</div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Customer Sentiment</div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 font-semibold">Positive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Real-time Capabilities</h3>
                  <ul className="space-y-3">
                    {[
                      "Instant customer intent recognition",
                      "Dynamic response generation", 
                      "Seamless human handoff when needed",
                      "Continuous learning from interactions"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="bg-white text-black hover:bg-gray-100">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Full Demo
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Live Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
              <Award className="mr-2 h-4 w-4" />
              Customer Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how companies are transforming their customer service with AI CallCenter
            </p>
          </div>

          {/* Auto-rotating testimonials */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="max-w-4xl mx-auto hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="flex items-center justify-center gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <blockquote className="text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
                          "{testimonial.content}"
                        </blockquote>
                        <div className="flex items-center justify-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.avatar}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-xl text-gray-900">{testimonial.name}</div>
                            <div className="text-gray-600">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
              <Network className="mr-2 h-4 w-4" />
              Seamless Integrations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Connect with Your Favorite Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrate with 100+ popular platforms and tools your team already uses
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
            {integrations.map((integration, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {integration.logo}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {integration.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Call Center?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of businesses already using AI CallCenter to deliver exceptional customer experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg">
                <Rocket className="mr-2 h-5 w-5" />
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Demo
            </Button>
          </div>
          <p className="text-white/70 text-sm mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI CallCenter</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The future of customer service powered by artificial intelligence. 
                Transform your call center with intelligent AI agents.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 AI CallCenter. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}